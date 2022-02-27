const Team = require("../Models/teamSchema.js");
const ErrorHandler = require("../Utils/errorHandler.js");
const catchAsyncError = require("../Middlerware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures");

// Create Member
exports.createTeamMember = catchAsyncError(async (req, res, next) => {
  const team = await Team.create({
    id: req.body.id,
    year: req.body.year,
    domain: req.body.domain,
    cardName: req.body.cardName,
    cardDesignation: req.body.cardDesignation,
    image: req.file.path,
    links: {
      github: req.body.github,
      linkedin: req.body.linkedin,
      instagram: req.body.instagram,
      behance: req.body.behance,
    },
  });

  res.status(201).json({
    success: true,
    team,
  });
});

//Get all Members
exports.getAllTeamMember = catchAsyncError(async (req, res) => {
  const teamCount = await Team.countDocuments();

  const apiFeatures = new ApiFeatures(Team.find(), req.query).search().filter();
  const post = await apiFeatures.query;
  res.status(200).json({
    success: true,
    post,
    teamCount,
  });
});

//Get Member Details
exports.getMemberDetail = catchAsyncError(async (req, res, next) => {
  const member = await Team.findById(req.params.id);

  if (!member) {
    return next(new ErrorHandler("Member not found", 404));
  }

  res.status(200).json({ success: true, member });
});
