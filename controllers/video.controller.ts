import { Request, Response } from "express";
import fs from "fs";
import Joi from "joi";
import OpenAI from "openai";
import path from "path";
import VideoModel from "../models";
import { response } from "../utils";

class VideoController {
  // static async uploadVideo(req: Request, res: Response) {
  //   const requestSchema = Joi.object({
  //     title: Joi.string().required().max(100),
  //   });

  //   const maxVideoSize: number = config?.get("App.max-video-size");
  //   let uploadedFileName = "";

  //   const storage = multer.diskStorage({
  //     destination: (req, file, cb) => {
  //       cb(null, "./uploads/");
  //     },
  //     filename: (req, file, cb) => {
  //       uploadedFileName = uuidv4() + "-" + file.originalname;
  //       cb(null, uploadedFileName);
  //     },
  //   });

  //   const upload = multer({
  //     storage: storage,
  //     limits: { fileSize: maxVideoSize },
  //   });

  //   upload.single("video")(req, res, async (err) => {
  //     const { error, value } = requestSchema.validate(req.body);
  //     const { title } = value;
  //     if (error) return response(res, 400, error.details[0].message);
  //     if (err) {
  //       console.log(err);
  //       return response(res, 400, `File upload failed, ${err.message}`);
  //     }

  //     if (!req.file) return response(res, 400, "File is required");

  //     const fileName = path.join(
  //       __dirname,
  //       "..",
  //       `/uploads/${uploadedFileName}`
  //     );

  //     const readFile = fs.createReadStream(fileName);
  //     const OpenAi = new OpenAI({
  //       apiKey: process.env.OPEN_AI_API_KEY,
  //     });

  //     const transcriptionParams = {
  //       file: readFile,
  //       model: "whisper-1",
  //     };

  //     try {
  //       const aiTranscript = await OpenAi.audio.transcriptions.create(
  //         transcriptionParams
  //       );

  //       const { text: transcript } = aiTranscript;

  //       const dataToStore = {
  //         title,
  //         transcript,
  //         url: `${req.get("host")}/assets/${uploadedFileName}`,
  //       };

  //       // save the data in the db
  //       const dbResponse = await VideoModel.create(dataToStore);
  //       return response(res, 200, "Video upload successful", dbResponse);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   });
  // }

  static async startStream(req: Request | any, res: Response) {
    const videoBlob = undefined;
    const videoBlobId = req?.body?.videoId;

    if (
      typeof videoBlob === "undefined" ||
      typeof videoBlobId === "undefined"
    ) {
      console.log("stream is missing");
      return response(res, 200, "Stream is missing");
    }

    //check if the video exists
    const checkVideo = await VideoModel.findOne({ videoId: videoBlobId });

    //create the video for reference

    if (!checkVideo) {
      await VideoModel.create({
        videoId: videoBlobId,
      });
    }

    const fileName = `${videoBlobId}.webm`;
    const uploadDir = path.join(__dirname, "..", "/uploads");
    const videoFilePath = `${uploadDir}/${fileName}`;

    if (!fs.existsSync(videoFilePath)) {
      fs.writeFileSync(videoFilePath, "");
    }

    const videoBlobStream = fs.createWriteStream(videoFilePath);
    videoBlobStream.write(videoBlob);
    console.log(`Stream started...`);

    return response(res, 200, "Video streaming started successfully");
  }

  static async EndStream(req: Request, res: Response) {
    //const videoBlobId = req?.params?.videoId;

    const requestSchema = Joi.object({
      videoId: Joi.string().required(),
      title: Joi.string().required(),
    });

    const { error, value } = requestSchema.validate(req.body);
    if (error) return response(res, 400, "Video id not provided");

    const dbVideo = await VideoModel.findOne({ videoId: value.videoId });
    if (!dbVideo) return response(res, 404, "video not found");

    const fileName = `${value.videoId}.webm`;
    const uploadDir = path.join(__dirname, "..", "/uploads");
    const videoFilePath = `${uploadDir}/${fileName}`;

    if (!fs.existsSync(videoFilePath)) {
      return response(res, 200, "Stream does not exist");
    }

    //other processing
    const readFile = fs.createReadStream(videoFilePath);
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
      const { title } = value;

      const dataToStore = {
        title,
        transcript,
        url: `${req.get("host")}/assets/${videoFilePath}/`,
      };

      // update the data in the database
      const dbResponse = await VideoModel.findOneAndUpdate(
        { videoId: value.videoId },
        dataToStore,
        { new: true }
      );
      if (!dbResponse) return response(res, 404, "Video not found");

      return response(res, 200, "Video stream successful", dbResponse);
    } catch (error) {
      console.error("Error:", error);
      return response(res, 500, "Video stream failed");
    }
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
