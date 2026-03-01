import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.use("/files", express.static("uploads"));

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success:false, error:"No file" });
  }

  res.json({
    success: true,
    filename: req.file.filename,
    original: req.file.originalname,
    downloadUrl: `/files/${req.file.filename}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
