import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "pos-products",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: file.originalname.split(".")[0],
  }),
});

const upload = multer({ storage });

export default upload;
