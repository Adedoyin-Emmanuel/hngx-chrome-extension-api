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
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const VideoModel = mongoose.model("Video", VideoSchema);

export default VideoModel;
