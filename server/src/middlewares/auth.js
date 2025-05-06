import jwt from "jsonwebtoken"
import { findOne } from "../models/database.js";
import { pool } from "../config/config.js";

export const auth = (table, loginCredential, signature) =>{
  return async (req, res, next)=>{
      try {
        const { token } = req.cookies;
        if(!token){
          throw new Error ("Invalid Token")
        }

        const decodedObj = await jwt.verify(token, signature);
        const {credential} = decodedObj;

        const user = await findOne(table, loginCredential, credential);

        if (!user) {
          return res.json({ message: "faculty not found" });
        }
        req.user = user;
        next();
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
    }
}
