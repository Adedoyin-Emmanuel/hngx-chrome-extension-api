import express from "express";
import VideoController from "../controllers";

const videoRouter = express.Router();

videoRouter.post("/", VideoController.create);
videoRouter.get("/", VideoController.getAllVideos);
videoRouter.get("/:id", VideoController.getVideoById);
videoRouter.delete("/:id", VideoController.deleteVideo);

export default videoRouter;
