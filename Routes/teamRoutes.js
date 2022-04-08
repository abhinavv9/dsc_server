const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/team");
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
  createTeamMember,
  getMemberDetail,
  getAllTeamMember,
} = require("../Controller/teamController");

const router = express.Router();

router.route("/team").get(getAllTeamMember);

router.post("/team/new", upload.single("teamImage"), createTeamMember);

router.route("/team/:id").get(getMemberDetail);

module.exports = router;
