import { Request, Response } from "express";
import { response } from "../utils";

class VideoController {
  static async create(req: Request, res: Response) {
    return response(res, 200, "Welcome 🚀");
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
