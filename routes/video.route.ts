import express from "express";
import VideoController from "../controllers";
import { upload } from "../utils";

const videoRouter = express.Router();

videoRouter.post(
  "/upload",
  upload.single("video"),
  VideoController.uploadVideo
);
videoRouter.get("/", VideoController.getAllVideos);
videoRouter.get("/:id", VideoController.getVideoById);
videoRouter.delete("/:id", VideoController.deleteVideo);

export default videoRouter;
