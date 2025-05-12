import { pool } from "../config/config.js";
import { findOne, generateJWT } from "../models/database.js";
import { sendMail } from "./mailController.js";
import bcrypt, { hash } from "bcrypt";
const otp = {};
export const studentLogin = async (req, res) => {
  try {
    const { rollno, password } = req.body;
    const TABLE = "Student";
    const CREDENTIAL = "rollno";
    const user = await findOne(TABLE, CREDENTIAL, rollno);
    if (!user) {
      return res.json({ message: "Student record does not exists!", flag: 0 });
    }
    if (password === user.pwd) {
      const token = await generateJWT(
        CREDENTIAL,
        rollno,
        TABLE,
        process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      return res.json({
        message: `LOGGED IN SUCCESFULLY!!! WELCOME ${user?.sname}`,
        data: user,
        flag: 1
      });
    } else {
      return res.json({
        message: "Invalid credentials", 
        flag: 2
      });
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
export const studentLogout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now(Date.now())),
  });
  res.send("Logged out succesfully");
};

export const facultyLogin = async (req, res) => {
  try {
    const { insEmail, insPwd } = req.body;
    const TABLE = "instructor";
    const CREDENTIAL = "insEmail";
    const user = await findOne(TABLE, CREDENTIAL, insEmail);
    if (!user) {
      return res.json({ message: "Faculty record does not exists!", flag: 0 });
    }

    if (insPwd === user.insPwd) {
      const token = await generateJWT(
        CREDENTIAL,
        insEmail,
        TABLE,
        process.env.MYSQL_FACULTY_TOKEN_PRIVATE_KEY
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      return res.json({
        message: "LOGGED IN  SUCCESFULLY!!" + "Welcome " + user.insName,
        data: user,
        flag: 1
      });
    } else {
      return res.json({
        message: "Invalid credentials",
        flag: 2
      });
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
export const facultyLogout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now(Date.now())),
  });
  res.send("Logged out succesfully");
};

export const adminLogin = async (req, res) => {
  try {
    const { adminEmail, adminPwd } = req.body;
    const TABLE = "admin";
    const CREDENTIAL = "adminEmail";
    const user = await findOne(TABLE, CREDENTIAL, adminEmail);
    if (!user) {
      return res.json({ message: "Admin not found!", flag: 0 });
    }
    if (adminPwd === user.adminPwd) {
      const token = await generateJWT(
        CREDENTIAL,
        adminEmail,
        TABLE,
        process.env.MYSQL_ADMIN_TOKEN_PRIVATE_KEY
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      res.json({
        message: "LOGGED IN SUCCESFULLY!! " + "Welcome Admin " + user.adminName,
        data: user,
        flag: 1
      });
    } else {
      return res.send({
        message: "Invalid credential", 
        flag: 2
      })
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
export const adminLogout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now(Date.now())),
  });
  res.send("Logged out succesfully");
};

export const advisorLogin = async (req, res) => {
  try {
    const { advEmail, advPwd } = req.body;
    const TABLE = "advisor";
    const CREDENTIAL = "advEmail";
    const user = await findOne(TABLE, CREDENTIAL, advEmail);
    if (!user) {
      return res.json({ message: "Advior not found!", flag: false });
    }
    if (advPwd === user.advPwd) {
      const token = await generateJWT(
        CREDENTIAL,
        advEmail,
        TABLE,
        process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      res.json({
        message: "LOGGED IN SUCCESFULLY!! " + "Welcome advisor " + user.advName,
        data: user,
        flag: true
      });
    } else {
      res.json({
        message: "Invalid Credentials",
        flag: false
      })
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
export const advisorLogout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now(Date.now())),
  });
  res.send("Logged out succesfully");
};

export const forgetPassword = async (req, res) => {
  try {
    const { role } = req.body;
    if (role == "student") {
      const { rollno } = req.body;
      const response = await pool.query(
        `SELECT semail FROM Student 
        WHERE rollno = ?`,
        [rollno]
      );
      if (response[0].length == 0) {
        res.send("rollno doesn't exists");
      } else {
        const semail = response[0][0].semail;
        const newOTP = Math.floor(100000 + Math.random() * 900000);
        otp[rollno] = newOTP;
        sendMail(semail, otp[rollno]);
        res.send("OTP sent to the registered email");
      }
    } else if (role == "faculty") {
      const { email } = req.body;
      const response = await pool.query(
        `SELECT insName FROM Instructor 
        WHERE insEmail = ?`,
        [email]
      );
      if (response[0].length == 0) {
        res.send("user doesn't exists");
      } else {
        const newOTP = Math.floor(100000 + Math.random() * 900000);
        otp[email] = newOTP;
        sendMail(email, otp[email]);
        res.send("OTP sent to the the email address: " + email);
      }
    } else if (role == "advisor") {
      const { email } = req.body;
      const response = await pool.query(
        `SELECT advName FROM Advisor 
        WHERE advEmail = ?`,
        [email]
      );
      if (response[0].length == 0) {
        res.send("user doesn't exists");
      } else {
        const newOTP = Math.floor(100000 + Math.random() * 900000);
        otp[email] = newOTP;
        sendMail(email, otp[email]);
        res.send("OTP sent to the the email address: " + email);
      }
    } else if (role == "admin") {
      const { email } = req.body;
      const response = await pool.query(
        `SELECT adminName FROM Admin 
        WHERE adminEmail = ?`,
        [email]
      );
      if (response[0].length == 0) {
        res.send("user doesn't exists");
      } else {
        const newOTP = Math.floor(100000 + Math.random() * 900000);
        otp[email] = newOTP;
        sendMail(email, otp[email]);
        res.send("OTP sent to the the email address: " + email);
      }
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
export const verifyOTP = async (req, res) => {
  try {
    const { oneTimePassword, rollno, email } = req.body;
    if (rollno) {
      if (otp[rollno] == oneTimePassword) {
        console.log("OTP MATCHED");
        return res.send(true);
      } else {
        console.log("OTP mismatched");
        return res.send(false);
      }
    } else if (email) {
      if (otp[email] == email) {
        console.log("OTP MATCHED");
        return res.send(true);
      } else {
        console.log("OTP mis matched");
        return res.send(false);
      }
    }
  } catch (err) {}
};

export const updatePassword = async (req, res) => {
  try {
    const { pwd, rollno } = req.body;
    // const hashedPassword = await bcrypt.hash(pwd, 10);
    const response = await pool.query(
      `UPDATE Student SET pwd = ? WHERE rollno = ?`,
      [pwd, rollno]
    );
    res.send("HASHED PASSWORD: " + pwd);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
