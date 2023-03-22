const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    user: { type: String, required: true },
    publication_date: { type: Date, default: Date.now },
    chat_id: { type: String, required: true },
    message: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    status: { type: String, default: 'No leido'}
});

module.exports = model('messages', messageSchema);