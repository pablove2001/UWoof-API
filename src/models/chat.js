const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    deleted: { type: Boolean, default: false },
    owner_user_id: { type: String, required: true },
    interested_user_id: { type: String, required: true },
    creation_date: { type: Date, default: Date.now }
});

module.exports = model('chats', chatSchema);