import { Request, Response } from "express";
import Joi from "joi";
import { response } from "../utils";

class VideoController {
  static async uploadVideo(req: Request, res: Response) {
    const requestSchema = Joi.object({
      title: Joi.string().required().max(100),
      transcript: Joi.string().required().max(5000),
      video: Joi.any()
        .required()
        .custom((value, helpers) => {
          if (!value) return helpers.error("any.required");
          if (value.size > 50 * 1024 * 1024) {
            return helpers.error("any.invalid", {
              invalids: [value],
              message: "File size must be less than 50MB",
            });
          }
          return value;
        }, "File validation"),
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
