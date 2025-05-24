import {
  findReqByRollno,
  approveRequest,
  getBacklogCourses,
} from "../models/database.js";
import { pool } from "../config/config.js";

export const addCourse = async (req, res) => {
  const {
    updatedName,
    updatedCode,
    updatedType,
    updatedSemester,
    updatedInstructor,
    updatedStructure,
  } = req.body;
  const { adminDept, adminSchool } = req.user;
  console.log(req.body);

  const result = await pool.query(
    `SELECT advId FROM AdvisorSemester WHERE semester = ?`,
    [updatedSemester]
  );
  // const { advId } = result[0][0];

  console.log(result[0][0]);
  const response = await pool.query(
    `INSERT INTO Courses (ccode, cname, cl, ct, cp, ctype, cdept, cschool, cins, cadv, csem) VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`,
    [
      updatedCode,
      updatedName,
      updatedStructure.cl,
      updatedStructure.ct,
      updatedStructure.cp,
      updatedType,
      adminDept,
      adminSchool,
      updatedInstructor,
      result[0][0].advId,
      updatedSemester,
    ]
  );

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
      `SELECT ssem FROM student
      WHERE rollno = ?`,
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
    const { ssem, sdept, sprogram } = req.user;
    const [courses] = await pool.query(
      "SELECT * FROM courses C WHERE csem = ? AND cdept IN (?,?)",
      [ssem, sdept, "APS"]
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
      `SELECT c.ccode, c.cname, c.ccredit, c.ctype, rq.status
      FROM regreq rq
      INNER JOIN courses c ON rq.ccode = c.ccode
      INNER JOIN student s ON rq.rollno = s.rollno
      WHERE s.rollno = ?`,
      [rollno]
    );
    console.log(rows);
    res.json({ rows });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const courseSelection = async (req, res) => {
  try {
    let sem = 0;
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
        sem = await pool.query(`SELECT csem FROM courses WHERE ccode = ?`, [
          ccode,
        ]);
        await pool.query(`INSERT INTO regreq VALUES (?,?, false, ?, ?)`, [
          rollno,
          ccode,
          sem[0][0].csem,
          "requested",
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
    await pool.query(`DELETE FROM StudentCourses WHERE rollno = ?`, [rollno]);
    res.send("RegReq data erased for " + sname);
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
};

export const pastCourses = async (req, res) => {
  try {
    const { rollno, ssem, sdept } = req.user;
    const pastCourses = await getBacklogCourses(rollno, sdept, ssem);
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
    const QUERY = `SELECT C.ccode, C.cname, C.ccredit, C.ctype, C.cschool, C.csem, C.cins, C.cadv, SC.status FROM courses C
      JOIN StudentCourses SC ON C.ccode = SC.ccode
      JOIN student S ON SC.rollno = S.rollno
      WHERE S.rollno = ?`;

    const [courses] = await pool.query(QUERY, [rollno]);
    let enrolledCredit = 0,
      completedCredit = 0,
      credit = {};
    console.log(courses);
    console.log("wolverine");
    courses
      .filter((c) => c.status == "enrolled")
      .map((item) => {
        enrolledCredit = enrolledCredit + item.ccredit;
      });
    console.log("jjjjjjjjjjjjjjjjjj: " + enrolledCredit);
    courses
      .filter((c) => c.status == "completed")
      .map((item) => {
        completedCredit = completedCredit + item.ccredit;
      });
    credit["enrolledCredit"] = enrolledCredit;
    credit["completedCredit"] = completedCredit;
    console.log(credit);
    if (!courses) {
      return res.json({
        message: "You have not selected any courses this semester yet.",
      });
    }
    res.json({
      message: "Your registered Courses",
      courses: courses,
      creditCount: credit,
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
    let r,
      flagArr = [];
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
    await Promise.all(
      response[0].map(async (std) => {
        r = await pool.query(
          `SELECT rq.status FROM regreq rq
          INNER JOIN student s 
          ON s.rollno = rq.rollno
          WHERE s.rollno = ?`,
          [std.rollno]
        );
        std.status = r[0][0]?.status || null;
      })
    );
    res.json({ data: response[0] });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const getAllCourses = async (req, res) => {
  try {
    // const {adminDept} = req.user;
    const { cschool, cdept } = req.body;
    const response = await pool.query(
      `
      SELECT * FROM Courses 
      WHERE cschool = ? AND cdept = ?`,
      [cschool, cdept]
    );
    const c = response[0];
    console.log(c);
    res.status(200).json({
      message: "courses data fetched",
      data: c,
    });
  } catch (err) {
    console.log("ERROR: " + err.message);
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const { sschool, sdept, ssem } = req.body;
    const response = await pool.query(
      `SELECT * FROM Student
      WHERE sschool =? AND sdept = ? AND ssem = ?`,
      [sschool, sdept, ssem]
    );
    res.json({
      message: "student data fetched",
      data: response[0],
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const getAllFaculties = async (req, res) => {
  try {
    const { insSchool, insDept } = req.body;
    console.log(insDept, insSchool);
    const response = await pool.query(
      `SELECT * FROM instructor
      WHERE insDept = ? AND insSchool = ?`,
      [insDept, insSchool]
    );
    res.json({
      message: "Faculty data fetched",
      data: response[0],
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const registeredCourses = async (req, res) => {
  try {
    let enrolledCredit = 0,
      completedCredit = 0;
    let credit = {};
    const rollno = req.params.rollno;
    const response = await pool.query(
      `SELECT C.ccode, C.cname, C.csem, C.ccredit, C.ctype, SC.status 
      FROM Courses C
      INNER JOIN studentcourses SC
      ON SC.ccode = C.ccode 
      WHERE SC.rollno = ?`,
      [rollno]
    );
    console.log("wolverine");
    console.log(response);

    response[0]
      .filter((c) => c.status == "enrolled")
      .map((c) => {
        enrolledCredit = enrolledCredit + c.ccredit;
      });
    credit["enrolledCredit"] = enrolledCredit;
    console.log(enrolledCredit);
    response[0]
      .filter((c) => c.status == "completed")
      .map((c) => {
        completedCredit = completedCredit + c.ccredit;
      });
    credit["completedCredit"] = completedCredit;
    console.log(completedCredit);
    res.json({
      message: "courses data fetched",
      data: response[0],
      credit: credit,
    });
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
};

export const RejectRequest = async (req, res) => {
  try {
    const rollno = req.params.rollno;
    const response = await pool.query(
      `
      UPDATE regreq
      SET status = "rejected"
      WHERE rollno = ?`,
      [rollno]
    );

    res.json({
      message: "Request Rejected",
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const myCourses = async (req, res) => {
  try {
    const { advId } = req.user;
    console.log(advId);
    const response = await pool.query(
      `SELECT * FROM courses
      WHERE cins = ?`,
      [advId]
    );
    res.json({
      message: "Courses",
      data: response[0],
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const updateCourse = async (req, res) => {
  try {
    console.log(req.body);

    const {
      currentCode,
      updatedName,
      updatedCode,
      updatedType,
      updatedSemester,
      updatedInstructor,
      updatedStructure,
    } = req.body;

    let QUERY = "UPDATE courses SET "; //buidling the SQL query
    const updates = [];
    const values = [];

    if (updatedName) {
      updates.push("cname = ?");
      values.push(updatedName);
    }
    if (updatedCode) {
      updates.push("ccode = ?");
      values.push(updatedCode);
    }
    if (updatedType) {
      updates.push("ctype = ?");
      values.push(updatedType);
    }
    if (updatedSemester) {
      updates.push("csem = ?");
      values.push(updatedSemester);
    }
    if (updatedInstructor) {
      updates.push("cins = ?");
      values.push(updatedInstructor);
    }
    if (updatedStructure) {
      if (updatedStructure.cl) {
        updates.push("cl = ?");
        values.push(updatedStructure.cl);
      }
      if (updatedStructure.ct) {
        updates.push("ct = ?");
        values.push(updatedStructure.ct);
      }
      if (updatedStructure.cp) {
        updates.push("cp = ?");
        values.push(updatedStructure.cp);
      }
    }

    if (updates.length === 0) {
      return res.send("No valid fields to update");
    }

    // Add the condition to update by the currentCode (primary key)
    QUERY += updates.join(", ") + " WHERE ccode = ?";
    values.push(currentCode); // Adding currentCode at the end for WHERE clause

    const result = await pool.query(QUERY, values);
    res.send(`Course updated successfully with code: ${currentCode}`);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(400).send("ERROR: " + err.message);
  }
};

export const electiveCourses = async (req, res) => {
  try {
    const { ssem, sdept, rollno } = req.user;
    let semtype, maxElective, maxElectiveCredit, result;
    if (ssem % 2) semtype = "autumn";
    else semtype = "spring";

    const [response] = await pool.query(
      `SELECT * FROM Courses
      WHERE csemtype = ? AND ctype = ? AND cdept = ?`,
      [semtype, "elective", sdept]
    );
    [result] = await pool.query(
      `SELECT sem.E, sem.eCredit FROM semester sem
      INNER JOIN Student S
      ON S.ssem = sem.semno
      WHERE S.rollno = ?`,
      [rollno]
    );
    maxElective = result[0].E;
    maxElectiveCredit = result[0].eCredit;
    return res.json({
      message: "elective courses fetched",
      data: response,
      maxElective: maxElective,
      maxElectiveCredit: maxElectiveCredit,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

export const openElectiveCourses = async (req, res) => {
  try {
    const { ssem, rollno } = req.user;
    let semtype, maxOpenElective, maxOpenElectiveCredit, result;
    if (ssem % 2) semtype = "autumn";
    else semtype = "spring";

    const [response] = await pool.query(
      `SELECT * FROM Courses
      WHERE csemtype = ? AND ctype = ?`,
      [semtype, "open-elective"]
    );
    [result] = await pool.query(
      `SELECT sem.oe, sem.oeCredit FROM semester sem
      INNER JOIN Student S
      ON S.ssem = sem.semno
      WHERE S.rollno = ?`,
      [rollno]
    );
    maxOpenElective = result[0].oe;
    maxOpenElectiveCredit = result[0].oeCredit;
    console.log(maxOpenElective);
    console.log(maxOpenElectiveCredit);
    return res.json({
      message: "open elective courses fetched",
      data: response,
      maxOpenElective: maxOpenElective,
      maxOpenElectiveCredit: maxOpenElectiveCredit,
    });
  
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
