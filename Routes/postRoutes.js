const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
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
  getAllPosts,
  createPost,
  getPostDetails,
} = require("../Controller/postController");

const router = express.Router();

router.route("/posts").get(getAllPosts);

router.post("/post/new", upload.single("postImage"), createPost);

router.route("/post/:id").get(getPostDetails);

module.exports = router;
