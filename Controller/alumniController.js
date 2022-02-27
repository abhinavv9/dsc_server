const Alumni = require("../Models/alumniSchema.js");
const ErrorHandler = require("../Utils/errorHandler.js");
const catchAsyncError = require("../Middlerware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures");

// Create Member
exports.createAlumniMember = catchAsyncError(async (req, res, next) => {
  const alumni = await Alumni.create({
    id: req.body.id,
    year: req.body.year,
    domain: req.body.domain,
    cardName: req.body.cardName,
    cardDesignation: req.body.cardDesignation,
    image: req.file.path,
    links: {
      linkedin: req.body.linkedin,
    },
  });

  res.status(201).json({
    success: true,
    alumni,
  });
});

//Get all Members
exports.getAllAlumniMember = catchAsyncError(async (req, res) => {
  const alumniCount = await Alumni.countDocuments();

  const apiFeatures = new ApiFeatures(Alumni.find(), req.query)
    .search()
    .filter();
  const alumni = await apiFeatures.query;
  res.status(200).json({
    success: true,
    alumni,
    alumniCount,
  });
});

//Get Member Details
exports.getAlumniDetail = catchAsyncError(async (req, res, next) => {
  const member = await Alumni.findById(req.params.id);

  if (!member) {
    return next(new ErrorHandler("Alumni not found", 404));
  }

  res.status(200).json({ success: true, member });
});
