import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100,
    },

    transcript: {
      type: String,
      required: false,
      max: 5000,
    },
  },
  { timestamps: true, versionKey: false }
);

const VideoModel = mongoose.model("Video", VideoSchema);

export default VideoModel;
