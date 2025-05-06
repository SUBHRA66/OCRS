export const adminProfile =async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json({ message: "Admin record does not exists!" });
    }
    res.json({ message: "Admin record found", user });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};

export const facultyProfile = async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.json({ message: "Faculty record does not exists!" });
      }
      res.json({ message: "Faculty record found", user });
    } catch (err) {
      res.status(400).send("ERROR " + err.message);
    }
};

export const studentProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json({ message: "Student record does not exists!" });
    }
    res.json({ message: "student record found", user });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};

export const advisorProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json({ message: "Advisor record does not exists!" });
    }
    res.json({ message: "Advisor record found", user });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};

