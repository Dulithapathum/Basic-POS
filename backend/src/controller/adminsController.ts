import { adminValidator } from "../validators/adminValidator";
import { Admin } from "../models/admin";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Register Admin
export const adminRegister = async (req: Request, res: Response) => {
  try {
    const validateData = adminValidator.safeParse(req.body);

    if (validateData.success) {
      const { password, email } = validateData.data;
      const exists = await Admin.findOne({ email });
      if (exists) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });
      }
    } else {
      res.status(400).json({
        message: "Invalid register data",
        errors: validateData.error.issues[0].message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Admin
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const validateData = adminValidator.safeParse(req.body);

    if (validateData.success) {
      const { email, password } = validateData.data;
      const admin = await Admin.findOne({ email });

      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);

        if (isMatch) {
          const token = jwt.sign(
            { adminId: admin._id, email: admin.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
          );

          res.json({
            token,
            admin: {
              id: admin._id,
              email: admin.email,
            },
          });
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(404).json({ message: "Admin not found" });
      }
    } else {
      res.status(400).json({
        message: "Invalid login data",
        errors: validateData.error.issues[0].message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
