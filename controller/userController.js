const User = require("../models/userSchemas");
const AppError = require("../error_handler/AppError");
const wrapAsync = require("../error_handler/AsyncError");
// const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const cookieOptions = require("../utils/cookieOptions");
const createUser = wrapAsync(async (req, res, next) => {
  // fileUrl, filename;
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return next(new AppError("some of the input fields is missing", 401));
  }

  const exist = await User.findOne({ where: { email: email } });
  console.log("exist", exist);
  if (exist) {
    return next(new AppError(`user exist with this email id: ${email}`, 401));
  }
  console.log("hhfghfghgh", password);
  let user = await User.create({
    name: name,
    email: email,
    password1: password,
    role: "USER",
  });
  //   const post = await User.find(prodId);

  console.log("save user", user);
  res.json({ user: user });
});

const userlogin = wrapAsync(async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return next(new AppError("some of the input fields is missing", 401));
  }

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return next(new AppError("login or password is incorrect", 401));
  }

  let match = await bcrypt.compare(password, user.password1);

  if (!match) {
    return next(new AppError("login or password is incorrect", 401));
  }

  console.log("my login user", user);
  // res.json({ user: user });
  sendToken(user, res, `welcome Back ${user.name}`, 201);
});

const getUser = wrapAsync(async (req, res, next) => {
  const user = await User.findAll();
  console.log("my user", user);
  res.json({ user: user });
});

const changePassword = wrapAsync(async (req, res, next) => {
  const userId = req.params.UserId;
  const { oldpassword, newpassword } = req.body;

  if (!oldpassword || !newpassword) {
    return next(new AppError("some of the input fields is missing", 401));
  }
  // const user = await User.findByPk(userId);
  const user = await User.findOne({ where: { userId: userId } });
  console.log("myuser", user);
  if (!user) {
    return next(new AppError(`no user found based on this id:${prodId}`, 401));
  }

  let match = await bcrypt.compare(oldpassword, user.password1);

  if (!match) {
    return next(new AppError("login or password is incorrect", 401));
  }

  user.password1 = await bcrypt.hash(newpassword, 12);

  user = await user.save();

  res.json({ user: user });
});

const deleteUser = wrapAsync(async (req, res, next) => {
  const prodId = req.params.productId;

  const user = await User.findByPk(prodId);

  if (!user) {
    return next(new AppError(`no user found based on this id:${prodId}`, 401));
  }

  await user.destroy();

  res.json({ message: "user deleted" });
});

const getUserProfile = wrapAsync(async (req, res, next) => {
  console.log("rootUser", req.rootUser);
  // const user = await User.findById(req.rootUser.email);
  const user = await User.findOne({ where: { email: req.rootUser.email } });
  res.status(201).json({
    success: true,
    user: user,
  });
});

const logout = wrapAsync(async (req, res) => {
  req.rootUser = {};
  // await req.rootUser.save();

  res
    .status(200)
    .cookie("jwttoken", "", {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    // .clearCookie('jwttoken')
    .json({ success: true, message: "logout successfully" });
});

module.exports = {
  createUser,
  userlogin,
  getUser,
  changePassword,
  deleteUser,
  getUserProfile,
  logout,
};
