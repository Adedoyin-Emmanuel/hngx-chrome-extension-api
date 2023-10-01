import express from "express";
import multer from "multer";
import VideoController from "../controllers";

const tempStorage = multer.memoryStorage();
const upload = multer({ storage: tempStorage });

const videoRouter = express.Router();

//stream endpoint
videoRouter.post(
  "/stream",
  upload.fields([{ name: "blob" }, { name: "videoId" }]),
  VideoController.startStream
);
//end stream
videoRouter.post("/stream/end/", VideoController.EndStream);
videoRouter.get("/", VideoController.getAllVideos);
videoRouter.get("/:id", VideoController.getVideoById);
videoRouter.delete("/:id", VideoController.deleteVideo);

export default videoRouter;
