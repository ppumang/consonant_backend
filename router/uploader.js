const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const { db } = require("../server");
const Post = db.model("post");
const ObjectId = mongoose.Types.ObjectId;

const { mediaUpload } = require("../middleware/multer");


router.post("/upload_media", mediaUpload.single("photo"), async (req, res) => {
    try {
        console.log("/upload_media")
        const userPost = new Post({
            mediaUrl: req.file.location,
            text: req.body?.text
        });
        console.log({ userPost })
        await userPost.save();
        return res.json({ succeed: true });
    } catch (e) {
        return res.json({ succeed: false, msg: e.toString() });
    }
})

router.post("/upload_text", async (req, res) => {
    const userPost = new Post({
        text: req.body?.text
    });
    try {
        await userPost.save();
        return res.json({ succeed: true });

    } catch (e) {
        console.log({ e });
        return res.json({ succeed: false });
    }
})

router.post("/upload_comment", async (req, res) => {
    const { text, post_id } = req.body;
    console.log({ text, post_id })
    if (!text || !post_id) {
        return res.json({ succeed: false });
    }
    try {
        let userPost = await Post.findOne({ _id: post_id });
        if (!userPost.comments) {
            userPost.comments = [text];
        } else {
            userPost.comments.push(text);
        }
        await userPost.save();
        return res.json({ succeed: true })
    } catch (e) {
        console.log({ e });
        return res.json({ succeed: false })
    }
})

module.exports = router;