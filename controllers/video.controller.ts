import config from "config";
import { Request, Response } from "express";
import Joi from "joi";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import VideoModel from "../models";
import { response } from "../utils";

class VideoController {
  static async uploadVideo(req: Request, res: Response) {
    const requestSchema = Joi.object({
      title: Joi.string().required().max(100),
      transcript: Joi.string().required().max(5000),
    });

    const maxVideoSize: number = config?.get("App.max-video-size");
    let uploadedFileName = "";

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./uploads/");
      },
      filename: (req, file, cb) => {
        uploadedFileName = uuidv4() + "-" + file.originalname;
        cb(null, uploadedFileName);
      },
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: maxVideoSize },
    });

    upload.single("video")(req, res, async (err) => {
      const { error, value } = requestSchema.validate(req.body);
      if (error) return response(res, 400, error.details[0].message);
      if (err) {
        console.log(err);
        return response(res, 400, "File upload failed");
      }

      if (!req.file) return response(res, 400, "File is required");

      const dataToStore = {
        ...value,
        url: `${req.get("host")}/assets/${uploadedFileName}`,
      };

      const dbResponse = await VideoModel.create(dataToStore);

      return response(res, 201, "Video stored successfully", dbResponse);
    });
  }

  static async getAllVideos(req: Request, res: Response) {
    return response(res, 200, "Getting all videos");
  }

  static async getVideoById(req: Request, res: Response) {
    return response(res, 200, "Getting one video");
  }

  static async deleteVideo(req: Request, res: Response) {
    return response(res, 200, "Deleted video successfully");
  }
}

export default VideoController;
