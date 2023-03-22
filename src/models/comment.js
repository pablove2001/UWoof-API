const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    comment: { type: String, required: true},
    comment_user: { type: String, required: true },
    publication_date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    pet_post_id: { type: String, required: true }
});

module.exports = model('comments', commentSchema);