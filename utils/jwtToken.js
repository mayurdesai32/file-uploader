// create and send token and save in the cookie.
const cookieOptions = require("./cookieOptions");
const jwt = require("jsonwebtoken");
async function generateAuthToken(user) {
  const payload = {
    user_id: user.user_id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const sendToken = async (user, res, message, statusCode) => {
  // create Jwt token
  // const token = await user.generateAuthToken();
  const token = await generateAuthToken(user);

  res
    .status(statusCode)
    .cookie("jwttoken", token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: message,
    });
};

module.exports = sendToken;
