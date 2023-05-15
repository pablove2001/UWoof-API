const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    role: { type: String, default: 'user' }, // user || admin
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String},
    birthday: { type: Date, default: Date.now },
    profile_picture: { type: String, default: 'https://th.bing.com/th/id/OIP.n3BKzWOcDwH5yOtN42eYKQHaHa?pid=ImgDet&rs=1' },
    creation_date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
});

module.exports = model('users', userSchema);