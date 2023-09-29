import config from "config";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const maxVideoSize: number = config?.get("App.max-video-size");
let uploadedFileName = "video.mp4";

//storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a unique random filename using uuid
    uploadedFileName = uuidv4() + "-" + file.originalname;
    cb(null, uploadedFileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxVideoSize },
});

export default upload;
