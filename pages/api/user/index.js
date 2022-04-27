import bcrypt from "bcrypt";

import {
  errorHandler,
  responseHandler,
  validateAllOnce,
} from "../../../utils/common";
import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    errorHandler("Invalid request type", res);
  }

  try {
    const { name, email, password } = req.body;
    validateAllOnce(req.body);

    // Create db conn
    await dbConnect();

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({ ...req.body, password: hashPassword });
    const saveUser = await user.save();

    if (saveUser) {
      const userDoc = saveUser._doc;
      delete userDoc.password;

      responseHandler(userDoc, res, 201);
    } else {
      errorHandler("Something when wrong.", res);
    }
  } catch (error) {
    errorHandler(error.message, res);
  }
}
