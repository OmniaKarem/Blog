const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");
const { getAllPosts, createPost, putPost, deletePost } = require("../controllers/postController");
const { validate, postSchema } = require("../middlewares/validate");

router.get("/", getAllPosts);
router.post("/", protect, validate(postSchema), createPost);
router.put("/:id", protect, validate(postSchema), putPost);
router.delete("/:id", protect, deletePost);

module.exports = router;
