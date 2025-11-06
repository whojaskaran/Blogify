
const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId =
      req.user && req.user._id ? req.user._id.toString() : "public";
    const uploadPath = path.resolve(`./public/uploads/${userId}`);
    try {
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

router.get("/add-new", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogId", async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    res.redirect(`/blog/${req.params.blogId}`);
  } catch (err) {
    console.error("Comment create error:", err);
    res.status(500).send("Could not post comment");
  }
});

const { generateBlog } = require("../controllers/blog");


router.post("/generate", generateBlog);


router.post("/", upload.single("coverImage"), async (req, res) => {
  try {


    const { title, body } = req.body;
    let coverImageURL = null;

    if (req.file) {
      const userId =
        req.user && req.user._id ? req.user._id.toString() : "public";
      coverImageURL = `/uploads/${userId}/${req.file.filename}`;
    }

    await Blog.create({
      title,
      body,
      coverImageURL,
      createdBy: req.user ? req.user._id : null,
    });

    return res.redirect("/");
  } catch (err) {
    console.error("Upload handler error:", err);
    return res.status(500).send("Upload failed: " + (err.message || "unknown"));
  }
});

module.exports = router;
