import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { errorHandeler, notFound, rateLimiter } from "./middlewares/";
import videoRouter from "./routes";
import { connectToDb } from "./utils";
const PORT = process.env.PORT || 2800;

const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(notFound);

app.use("/api/", videoRouter);

app.use(errorHandeler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDb();
});
