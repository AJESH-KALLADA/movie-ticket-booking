import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../backend/routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/user",userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

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

