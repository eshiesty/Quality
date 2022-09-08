require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//import routes
const authRoute = require("./routes/auth");
const toDosRoute = require("./routes/ToDos");
const postsRoute = require("./routes/posts");
const path = require("path");
const app = express();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("Mynt express server");
});

// app.post("/name", (req, res) => { //just a test!!
//   if (req.body.name) {
//     return res.json({ name: req.body.name });
//   } else {
//     return res.status(400).json({ error: "No name provided" });
//   }
// });

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const gc = new Storage({
  keyFileName: `${__dirname}/minterval-4e7d0aef73e3.json`,
  projectId: "minterval",
});
const bucketName = "minterval-profile-photos";
const bucket = gc.bucket(bucketName);
const origin = "http://localhost:3000";
const maxAgeSeconds = 3600;
const method = "POST";
const responseHeader = "Content-Type";
async function configureBucketCors() {
  await gc.bucket(bucketName).setCorsConfiguration([
    {
      maxAgeSeconds,
      method: [method],
      origin: [origin],
      responseHeader: [responseHeader],
    },
  ]);
}
app.post(
  "/upload-file-to-cloud-storage",
  multer.single("file"),
  function (req, res, next) {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
      next(err);
    });
    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.status(200).json({ publicUrl });
    });
    blobStream.end(req.file.buffer);
    console.log(req.file);
  }
);
app.listen(process.env.GOOGLEPORT, () => {
  console.log(`listening at http://localhost:${process.env.GOOGLEPORT}`);
});

// gc.getBuckets().then((res) => console.log(res));

app.use("/api/auth", authRoute); //after get request to api/auth, go to authRoute
app.use("/api/ToDos", toDosRoute);
app.use("/api/posts", postsRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mynt database");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
