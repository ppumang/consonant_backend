const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    mediaUrl: { type: String },
    text: { type: String, required: true },
    comments: { type: Array, default: [] },
    created: { type: Date, default: Date.now },
});
PostSchema.index({ userId: 1 });

exports.collection = { name: "post", schema: PostSchema };
