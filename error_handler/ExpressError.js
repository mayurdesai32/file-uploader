// const AppError = require('./AppError');

const ExpressError = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const { status = 500, message = "Error Occur" } = err;
    console.log("error" + err.stack);
    res
      .status(status)
      .json({ sucess: false, errmessage: message, errstack: err.stack });
  }
  // for production
  else if (process.env.NODE_ENV === "production") {
    let { status = 500, message = "Error Occur" } = err;

    // Handling  duplicate key errors
    if (err.code === 11000) {
      message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      status = 400;
    }
    // Wrong  Object ID Error
    if (err.name === "CastError") {
      message = `Resource not found. Invalid: ${err.value}`;
      status = 400;
    }
    // Handling  Validation Error
    else if (err.name === "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      status = 400;
    }

    res.status(status).json({ sucess: false, errmessage: message });
  }
};
module.exports = ExpressError;
