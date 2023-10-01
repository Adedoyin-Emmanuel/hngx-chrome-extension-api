import config from "config";
import { Request, Response } from "express";
import fs from "fs";
import Joi from "joi";
import multer from "multer";
import OpenAI from "openai";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import VideoModel from "../models";
import { response } from "../utils";

class VideoController {
  static async uploadVideo(req: Request, res: Response) {
    const requestSchema = Joi.object({
      title: Joi.string().required().max(100),
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
      const { title } = value;
      if (error) return response(res, 400, error.details[0].message);
      if (err) {
        console.log(err);
        return response(res, 400, `File upload failed, ${err.message}`);
      }

      if (!req.file) return response(res, 400, "File is required");

      const fileName = path.join(
        __dirname,
        "..",
        `/uploads/${uploadedFileName}`
      );
      const readFile = fs.createReadStream(fileName);
      const OpenAi = new OpenAI({
        apiKey: process.env.OPEN_AI_API_KEY,
      });

      const transcriptionParams = {
        file: readFile,
        model: "whisper-1",
      };

      try {
        const aiTranscript = await OpenAi.audio.transcriptions.create(
          transcriptionParams
        );

        const { text: transcript } = aiTranscript;

        const dataToStore = {
          title,
          transcript,
          url: `${req.get("host")}/assets/${uploadedFileName}`,
        };

        // save the data in the db
        const dbResponse = await VideoModel.create(dataToStore);
        return response(res, 200, "Video upload successful", dbResponse);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  static async getAllVideos(req: Request, res: Response) {
    const dataFromDb = await VideoModel.find();

    return response(res, 200, "Videos fetched successfully", dataFromDb);
  }

  static async getVideoById(req: Request, res: Response) {
    const requestSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = requestSchema.validate(req.params);
    if (error) return response(res, 400, error.details[0].message);

    const dataFromDb = await VideoModel.findById(value.id);
    if (!dataFromDb) return response(res, 404, "Video not found");

    return response(res, 200, "Video fetched successfully", dataFromDb);
  }

  static async deleteVideo(req: Request, res: Response) {
    const requestSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error, value } = requestSchema.validate(req.params);
    if (error) return response(res, 400, error.details[0].message);

    const dataFromDb = await VideoModel.findByIdAndDelete(value.id);
    if (!dataFromDb) return response(res, 404, "Video not found");

    return response(res, 200, "Video deleted successfully");
  }
}

export default VideoController;
