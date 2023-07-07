import dotenv from "dotenv";
import { cloudinaryImage } from "@keystone-6/cloudinary";

dotenv.config();

export const r2: any = {
  // Files that use this store will be stored in an s3 bucket
  kind: "s3",
  // This store is used for the file field type
  type: "image",
  // The S3 bucket name pulled from the S3_BUCKET_NAME environment variable
  bucketName: "khaya-os",
  // The S3 bucket region pulled from the S3_REGION environment variable
  region: "auto",
  // The S3 Access Key ID pulled from the S3_ACCESS_KEY_ID environment variable
  accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
  // The S3 Secret pulled from the S3_SECRET_ACCESS_KEY environment variable
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  // The S3 links will be signed so they remain private
  signed: { expiry: 5000 },
};

export const cloudinary: any = cloudinaryImage({
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_API_FOLDER || "",
  },
});
