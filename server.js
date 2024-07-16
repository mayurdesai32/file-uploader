require("dotenv").config({ path: "config.env" });
const app = require("./app");
const cloudinary = require("cloudinary");
// const Stripe = require('stripe');
// module.exports.stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const db = require("./db/db");
// db();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// db.sync({ force: true })
//   .then((result) => {
//     // console.log(result);
//   })
//   .catch((err) => console.log(err));

// exports.stripe = new Stripe(process.env.STRIPE_API_SECRET);
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server running on port ${port} in ${process.env.NODE_ENV}Mode.`);
});

// for handling promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
