import { findOne, generateJWT } from "../models/database.js";

export const studentLogin = async (req, res) => {
  try {
    const { rollno, password } = req.body;
    const TABLE = "Student";
    const CREDENTIAL = "rollno";
    const user = await findOne(TABLE, CREDENTIAL, rollno);
    if (!user) {
      return res.json({ message: "Student record does not exists!" });
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

      // return res.send("LOGGED IN SUCCESFULLY!! WELCOME " + user?.sname);
      return res.json({
        message: `LOGGED IN SUCCESFULLY!!! WELCOME ${user?.sname}`,
        data: user,
      });
    } else {
      return res.status(400).send("Invalid credentials");
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
      return res.json({ message: "Faculty record does not exists!" });
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
        data: user
      })
    } else {
      throw new Error("Invalid credentials");
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
      return res.json({ message: "Admin not found!" });
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
      });
    } else {
      throw new Error("Invalid credentials");
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
      return res.json({ message: "Advior not found!" });
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
      });
    } else {
      throw new Error("Invalid credentials");
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
