import {
  findReqByRollno,
  approveRequest,
  findCourseByName,
  sendRegReq,
  getBacklogCourses,
} from "../models/database.js";
import { pool } from "../config/config.js";

export const addCourses = async (req, res) => {
  const { ccode, cname, ccredit, cdept, csem, ctype, insName, advName } =
    req.body;

  const [result1] = await pool.query(
    `SELECT insId FROM Instructor
    WHERE insName = ?`,
    [insName]
  );
  const insId = result1[0].insId;

  const [result2] = await pool.query(
    `SELECT advId FROM Advisor
    WHERE advName = ?`,
    [advName]
  );
  const advId = result2[0].advId;
  console.log(advId);

  const QUERY = `
  INSERT INTO Courses VALUES
  (?,?,?,?,?,?,?,?)`;

  await pool.query(QUERY, [
    ccode,
    cname,
    ccredit,
    cdept,
    csem,
    ctype,
    insId,
    advId,
  ]);
  return res.json({
    message: "Course added successfully",
  });
};

//to be improvised
//credit count added
export const getAllRequest = async (req, res) => {
  try {
    const { advId } = req.user;
    const rollno = req.params.rollno;

    //retrieving semester data of advisor
    const [result] = await pool.query(
      `SELECT semester FROM AdvisorSemester
      WHERE advId = ?`,
      [advId]
    );

    //retrieve semester data of student
    const [ssem] = await pool.query(
      `SELECT ssem FROM Student
      WHERE rollno =?`,
      [rollno]
    );

    //checking if this advisor is assigned to this semester or not
    if (
      ssem[0].ssem == result[0].semester ||
      ssem[0].ssem == result[1].semester
    ) {
      const request = await findReqByRollno(rollno);

      //calculate the total credits selected
      let creditCount = 0;
      request.forEach((key) => {
        const { ccredit } = key;
        creditCount = creditCount + ccredit;
      });
      res.json({
        message: "Requests:",
        creditsSelected: creditCount,
        request,
      });
    } else {
      res.json({ message: "Not authorized for this semester" });
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

//needs correction
export const ApproveRequest = async (req, res) => {
  try {
    const rollno = req.params.rollno;
    const [request] = await findReqByRollno(rollno);
    const { approvalFlag } = request;
    const { advId } = req.user;

    //retrieving semester data of advisor
    const [result] = await pool.query(
      `SELECT semester FROM AdvisorSemester
      WHERE advId = ?`,
      [advId]
    );

    //retrieve semester data of student
    const [ssem] = await pool.query(
      `SELECT ssem FROM Student
      WHERE rollno =?`,
      [rollno]
    );
    if (
      ssem[0].ssem == result[0].semester ||
      ssem[0].ssem == result[1].semester
    ) {
      if (!approvalFlag) {
        // not yet approved
        await approveRequest(rollno);
        return res.status(200).json({ message: "Approved" });
      } else {
        return res.json({ message: "Alreadey Approved" });
      }
    } else {
      res.json({ message: "Not authorized for this semester" });
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const courses = async (req, res) => {
  try {
    const { rollno, ssem, sdept } = req.user;
    const [courses] = await pool.query(
      "SELECT * FROM courses WHERE csem = ? AND cdept = ?",
      [ssem, sdept]
    );

    res.json({ message: "Courses available in your semester", courses });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const courseRegReq = async (req, res) => {
  try {
    const { rollno } = req.user;

    const [rows] = await pool.query(
      `SELECT c.ccode, c.cname, c.ccredit, c.ctype
      FROM courses c
      INNER JOIN regreq rq ON rq.ccode = c.ccode
      INNER JOIN Student s ON rq.rollno = s.rollno
      WHERE s.rollno = ?`,
      [rollno]
    );
    console.log(rows);
    res.json({ rows });
    // res.json({data: rows[0]})
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const courseSelection = async (req, res) => {
  try {
    const { rollno } = req.user;
    const { ccodes } = req.body;
    const [response] = await pool.query(
      `SELECT EXISTS (
      SELECT 1 FROM regreq WHERE rollno = ?) AS present`,
      [rollno]
    );
    const flag = response[0].present;
    if (!flag) {
      ccodes.forEach(async (ccode) => {
        await pool.query(`INSERT INTO regreq VALUES (?,?, false)`, [
          rollno,
          ccode,
        ]);
      });
      res.json({ message: "Course registration request sent to advisor" });
    } else {
      res.send("C");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const deleteRegReq = async (req, res) => {
  try {
    const { rollno, sname } = req.user;
    await pool.query(`DELETE FROM regreq WHERE rollno = ?`, [rollno]);
    res.send("RegReq data erased for " + sname);
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
};

export const pastCourses = async (req, res) => {
  try {
    const { ssem, sdept } = req.user;
    const pastCourses = await getBacklogCourses(sdept, ssem);
    return res.send(pastCourses);
  } catch (err) {
    return res.status(400).send("ERROR: " + err.message);
  }
};

export const seeCourses = async (req, res) => {
  try {
    const { insId } = req.user;
    const [result] = await pool.query(
      `SELECT s.rollno, s.sname, s.scgpa
      FROM Student s
      JOIN StudentCourses sc ON s.rollno = sc.rollno
      JOIN Courses c ON sc.ccode = c.ccode
      WHERE c.cins = ?`,
      [insId]
    );
    res.send(result);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const myRegisteredCourses = async (req, res) => {
  try {
    const { rollno } = req.user;
    const QUERY = `SELECT C.* FROM courses C
      JOIN StudentCourses SC ON C.ccode = SC.ccode
      JOIN student S ON SC.rollno = S.rollno
      WHERE S.rollno = ?`;

    const [courses] = await pool.query(QUERY, [rollno]);
    if (!courses) {
      return res.json({
        message: "You have not selected any courses this semester yet.",
      });
    }
    res.json({
      message: "Your registered Courses",
      courses,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const facultyMyCourses = async (req, res) => {
  try {
    const { insId } = req.user;
    const response = await pool.query(
      `
      SELECT c.cname, c.ccredit, c.ccode, c.ctype 
      FROM courses c
      WHERE cins = ?`,
      [insId]
    );
    res.send(response[0]);
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
};

export const getRequests = async (req, res) => {};

export const seeStudents = async (req, res) => {
  try {
    const { advId } = req.user;
    let response = await pool.query(
      `SELECT semester FROM AdvisorSemester 
      WHERE advId  = ?`,
      [advId]
    );
    const semesters = response[0].map((item) => item.semester);
    response = await pool.query(`SELECT * FROM Student WHERE ssem IN (?, ?)`, [
      semesters[0],
      semesters[1],
    ]);
    res.send(response[0]);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const  getAllCourses = async (req, res) =>{
  try{
    // const {adminDept} = req.user;
    const {cschool, cdept} = req.body
    const response = await pool.query(`
      SELECT * FROM Courses 
      WHERE cschool = ? AND cdept = ?`, [cschool, cdept])
    const c = response[0];
    console.log(c)
    res.status(200).json({
      message: "courses data fetched", 
      data: c
    })
  }catch(err){
    console.log("ERROR: " + err.message);
  }
}