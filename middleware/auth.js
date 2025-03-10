const jwt = require("jsonwebtoken");
const AppError = require("../error_handler/AppError");
const wrapAsync = require("../error_handler/AsyncError");
// const User = require("../models/userSchema");

const authenticateUser = wrapAsync(async (req, res, next) => {
  const { jwttoken } = req.cookies;

  if (!jwttoken) {
    return next(new AppError("Login first to access this resource.", 401));
  }

  const verifytoken = jwt.verify(jwttoken, process.env.JWT_SECRET);

  // const rootUser = await User.findById(verifytoken.id);
  const rootUser = verifytoken;

  // console.log("tokenid ", verifytoken.id);
  if (!rootUser) {
    return next(new AppError("Invaliduser", 403));
  }

  req.rootUser = rootUser;

  next();
});

const authorizeRoles = (req, res, next) => {
  if (req.rootUser.role !== "ADMIN") {
    return next(
      new AppError(`only admin is  allowed to acccess this resource`, 401)
    );
  }
  next();
};

// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.rootUser.role)) {
//       return next(
//         new AppError(
//           `Role (${req.rootUser.role}) is not allowed to acccess this resource`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

module.exports = { authenticateUser, authorizeRoles };
