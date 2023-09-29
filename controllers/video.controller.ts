import { Request, Response } from "express";
import fs from "fs";
import Joi from "joi";
import { response } from "../utils";


class VideoController {
  static async uploadVideo(req: Request, res: Response) {
    const requestSchema = Joi.object({
      title: Joi.string().required().max(100),
      transcript: Joi.string().required().max(5000),
    });

    if (!req.file) return response(res, 400, "File is required");

   // const stream = fs.createReadStream(req.file.buffer);

    // const fileInfo = await fileTypeFromStream(stream);

    // if (!fileInfo || fileInfo.mime.split("/")[0] !== "video") {
    //   return response(
    //     res,
    //     400,
    //     "Invalid file type. Please upload a video file."
    //   );
    // }

    const { error, value } = requestSchema.validate(req.body);

    if (error) return response(res, 400, error.details[0].message);

    return response(res, 200, req.file.filename);
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
