const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/alumni");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const {
  createAlumniMember,
  getAllAlumniMember,
  getAlumniDetail,
} = require("../Controller/alumniController");

const router = express.Router();

router.route("/alumni").get(getAllAlumniMember);

router.post("/alumni/new", upload.single("alumniImage"), createAlumniMember);

router.route("/alumni/:id").get(getAlumniDetail);

module.exports = router;
