import {} from "dotenv";
import { Storage } from "@google-cloud/storage";
import { readFile } from "fs/promises";

const serviceKey = JSON.parse(
  await readFile(new URL(process.env.GCP_SA_URL, import.meta.url))
);

const storage = new Storage({
  credentials: serviceKey,
  projectId: process.env.GCP_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    let { originalname, buffer } = file;
    originalname = new Date().getTime() + "_" + originalname;
    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
};

export default uploadImage;
