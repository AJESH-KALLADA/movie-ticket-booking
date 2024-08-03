import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../backend/routes/user-routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/user",userRouter);

mongoose
  .connect(
      `mongodb+srv://ajeshkallada10:${process.env.MONGODB_PASSWORD}@cluster0.ze7p7bp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   )
  .then(()=>
      app.listen(5000,()=>
          console.log("Connected To Database And Server Is Running")
      )
   )
.catch((e) => console.log(e));

