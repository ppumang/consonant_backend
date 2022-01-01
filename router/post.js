const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { db } = require("../server");
const Post = db.model("post");
const ObjectId = mongoose.Types.ObjectId;

const { mediaUpload } = require("../middleware/multer");


router.get("/get_post_list", async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ created: -1 }).lean();
        return res.json({ succeed: true, posts });
    } catch (e) {
        console.log({ e });
        return res.json({ succeed: false })
    }
})

module.exports = router;