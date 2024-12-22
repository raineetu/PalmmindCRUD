import { Signup, login, updateProfile, deleteUser, resetPassword, fetchUsers } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

//routes
router.route("/signup").post(Signup);
router.route("/login").post(login);
router.route("/updateprofile/:userId").put(updateProfile);
router.route("/delete/:userId").delete(deleteUser);
router.route("/reset").post(resetPassword);
router.route("/fetch").get(fetchUsers);


export default router;  