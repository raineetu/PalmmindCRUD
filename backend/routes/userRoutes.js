import { Signup, login, updateProfile, deleteUser, resetPassword } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

//routes
router.route("/signup").post(Signup);
router.route("/login").post(login);
router.route("/updateprofile").put(updateProfile);
router.route("/delete/:userId").delete(deleteUser);
router.route("/reset").post(resetPassword);

export default router;  