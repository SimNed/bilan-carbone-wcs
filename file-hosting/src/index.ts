import express from "express";
import multer from "multer";

const PUBLIC_DIR = "public";

const app = express();

// Servir les fichiers (lecture)
app.use(express.static(PUBLIC_DIR));

// Permettre l'envoi de fichiers (écriture)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PUBLIC_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/", upload.single("file"), (req, res) => {
  return res.status(201).json({
    filename: req.file?.filename,
  });
});

app.listen(5001, () => {
  console.log("File hosting server listening on port 5001.");
});
