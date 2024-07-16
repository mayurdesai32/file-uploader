const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controller/post");
const express = require("express");
const singleUpload = require("../middleware/multer");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../middleware/auth");

router.post(
  "/create",
  authenticateUser,
  authorizeRoles,
  singleUpload,
  createPost
);
router.post("/getall", getPost);
router.put(
  "/update/:productId",
  authenticateUser,
  authorizeRoles,
  singleUpload,
  updatePost
);
router.delete(
  "/delete/:productId",
  authenticateUser,
  authorizeRoles,
  deletePost
);

module.exports = router;
