const Post = require("../models/postSchemas");
const AppError = require("../error_handler/AppError");
const wrapAsync = require("../error_handler/AsyncError");
// const sendEmail = require("../utils/sendEmail");
// const sendToken = require("../utils/jwtToken");
const getDataUri = require("../utils/dataUri");

const cloudinary = require("cloudinary");

const createPost = wrapAsync(async (req, res, next) => {
  // fileUrl, filename;
  const { filename } = req.body;

  if (!filename || !req.file) {
    return next(new AppError("some of the input fields is missing", 401));
  }

  const file = getDataUri(req.file);
  console.log("file created", file.content);

  const myCloud = await cloudinary.v2.uploader.upload(file.content, {
    resource_type: "raw", // Ensure the file is treated as a raw file
    format: "pdf",
  });

  let public_id = myCloud.public_id;
  let url = myCloud.secure_url;

  let post = Post.create({
    policy_name: filename,
    public_id: public_id,
    url: url,
  });
  console.log("save post", post);
  res.json({ post: post });
});

const getPost = wrapAsync(async (req, res, next) => {
  const post = await Post.findAll();
  console.log("my post", post);

  res.json({ post: post });
});

const updatePost = wrapAsync(async (req, res, next) => {
  const prodId = req.params.productId;
  const { policy_name } = req.body;

  let post = await Post.findByPk(prodId);

  if (!post) {
    return next(new AppError(`no data found based on this id:${prodId}`, 401));
  }

  if (req.file) {
    const file = getDataUri(req.file);

    let ssss = await cloudinary.v2.uploader.destroy(post?.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(file.content);

    post.public_id = myCloud.public_id;
    post.url = myCloud.secure_url;
  }

  if (policy_name) {
    post.policy_name = policy_name;
  }
  post = await post.save();

  res.json({ post: post });
});

const deletePost = wrapAsync(async (req, res, next) => {
  const prodId = req.params.productId;

  const post = await Post.findByPk(prodId);

  if (!post) {
    return next(new AppError(`no data found based on this id:${prodId}`, 401));
  }

  await cloudinary.v2.uploader.destroy(post?.public_id);

  await post.destroy();

  res.json({ message: "post deleted" });
});

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
