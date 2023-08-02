import dotenv from "dotenv";
import express, { Request, Response } from "express";

import userRouter from "./routes/user";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
