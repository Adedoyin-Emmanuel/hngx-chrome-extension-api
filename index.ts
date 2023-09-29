import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandeler, notFound, rateLimiter } from "./middlewares/";
import { connectToDb } from "./utils";
const PORT = process.env.PORT || 2800;

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(notFound);

app.use("/api/test", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Hello World 🚀" });
});

app.use(errorHandeler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDb();
});
