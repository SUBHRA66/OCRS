import { pool } from "../config/config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateJWT = async function (
  credential,
  value,
  table,
  privateKey
) {
  const QUERY = "SELECT * FROM ?? WHERE ?? = ?";

  const [rows] = await pool.query(QUERY, [table, credential, value]);
  if (rows.length === 0) {
    throw new Error("User not found");
  }

  const user = rows[0];

  const token = await jwt.sign({ credential: user[credential] }, privateKey, {
    expiresIn: "3d",
  });
  return token;
};

export const ifExists = async (table, credential, value) => {
  const QUERY = `SELECT EXISTS (
  SELECT 1 FROM ?? WHERE ?? = ?) AS present`;

  const [rows] = await pool.query(QUERY, [table, credential, value]);
  const flag = rows[0].present;
  return flag;
};

export const findOne = async (table, credential, value) => {
  const flag = ifExists(table, credential, value);
  if (!flag) {
    return {};
  }
  const QUERY = `SELECT * FROM ?? WHERE ?? = ?`;

  const [row] = await pool.query(QUERY, [table, credential, value]);
  return row[0];
};

export const findCourses = async (csem) => {
  const [rows] = await pool.query(
    `SELECT * FROM Courses
    WHERE Courses.csem = ?`,
    [csem]
  );
  return rows;
};

export const findAllCourses = async () => {
  const [rows] = await pool.query(`SELECT * FROM Courses`);
  return rows;
};

export const findCourseByName = async (cname) => {
  const [ccode] = await pool.query(`SELECT * FROM Courses WHERE cname = ?`, [
    cname,
  ]);

  return ccode[0];
};

export const sendRegReq = async (rollno, ccode) => {
  const response = await pool.query(
    `INSERT INTO regreq VALUES ( ?, ?, FALSE)
    ON DUPLICATE KEY UPDATE
    approvalFlag = VALUES(approvalFlag);`,
    [rollno, ccode]
  );
};

export const findReqByRollno = async (rollno) => {
  const QUERY = `SELECT c.csem, c.cname, c.ccode, c.ccredit, c.ctype, rq.status, rq.approvalFlag
    FROM courses c
    INNER JOIN regreq rq ON c.ccode = rq.ccode
    WHERE rq.rollno = ?`;

  const [rows] = await pool.query(QUERY, [rollno]);
  return rows;
};

export const approveRequest = async (rollno) => {
  await pool.query(
    `UPDATE regreq
     SET approvalFlag = true, status = ?
     WHERE rollno = ?`,
    ["approved", rollno]
  );

  await pool.query(
    `INSERT INTO StudentCourses (rollno, ccode, approvalFlag, status)
       SELECT rollno, ccode, approvalFlag, ? FROM regreq
       WHERE rollno = ?`,
    ["enrolled", rollno]
  );
  console.log("THIS LINE IS GETTING PRINTED");
};

export const findCourseByDept = async (cdept) => {
  const [rows] = await pool.query(
    `SELECT * FROM Courses 
    WHERE cdept = ?`,
    [cdept]
  );
  return rows;
};

export const findCourseBySem = async (csem) => {
  const [rows] = await pool.query(
    `SELECT * FROM Courses 
    WHERE csem = ?`,
    [csem]
  );
  return rows;
};

export const findCourse = async (csem, cdept) => {
  const [rows] = await pool.query(
    "SELECT * FROM courses WHERE csem = ? AND cdept = ?",
    [csem],
    [cdept]
  );
};

export const getBacklogCourses = async (cdept, csem) => {
  const [pastCourses] = await pool.query(
    `SELECT * FROM Courses
    WHERE cdept = ? AND csem < ?`,
    [cdept, csem]
  );

  return pastCourses;
};


export const dada = () =>{

  backlogCourses.filter((bc)=>bc.csem < sem).map((course) =>{
    
  })

}