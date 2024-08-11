import express from "express";
import { deleteUser, getAllUsers, getBookingsOfuser, login, signup, updateUser } from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.get("/",getAllUsers)
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfuser);

export default userRouter;