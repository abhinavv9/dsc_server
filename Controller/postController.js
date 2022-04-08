const Post = require("../Models/postSchema.js");
const ErrorHandler = require("../Utils/errorHandler.js");
const catchAsyncError = require("../Middlerware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures");

// Create Post
exports.createPost = catchAsyncError(async (req, res, next) => {
  console.log(req.file);
  const product = await Post.create({
    title: req.body.title,
    content: req.body.content,
    image: req.file.path,
    category: req.body.category,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all Posts
exports.getAllPosts = catchAsyncError(async (req, res) => {
  console.log(req);
  const resultPerPage = 7;
  const postCount = await Post.countDocuments();

  const apiFeatures = new ApiFeatures(Post.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const post = await apiFeatures.query;
  res.status(200).json({
    success: true,
    post,
    postCount,
  });
});

//Get Post Details
exports.getPostDetails = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  res.status(200).json({ success: true, post });
});
