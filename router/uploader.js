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

module.exports = router;