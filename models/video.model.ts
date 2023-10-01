import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: false,
      max: 100,
    },

    transcript: {
      type: String,
      required: false,
    },

    url: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const VideoModel = mongoose.model("Video", VideoSchema);

export default VideoModel;
