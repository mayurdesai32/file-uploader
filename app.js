const express = require("express");
const cors = require("cors");

const user = require("./routes/user");
const post = require("./routes/post");
const ExpressError = require("./error_handler/ExpressError");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: "*", // Allow requests from this specific origin
  methods: "*", // Allow specific HTTP methods
  // allowedHeaders: 'Authorization, Content-Type', // Allow specific headers
  credentials: true,
};

// for middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/v2/api/post", post);

app.use("/v2/api/user", user);

// for middleware Error handler
app.use(ExpressError);

module.exports = app;
