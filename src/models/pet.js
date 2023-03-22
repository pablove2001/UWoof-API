const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    kind_animal: { type: String, required: true },
    race: { type: String, default: 'Unknown' },
    name: { type: String, default: 'No name' },
    age: { type: Number, default: -1 },
    images: { type: [String], required: true },
    vaccinated: { type: Boolean, default: false },
    castrated: { type: Boolean, default: false },
    description: { type: String, default: '' },
    height_cm: { type: Number, default: -1 },
    long_cm: { type: Number, default: -1 },
    weight_kg: { type: Number, default: -1 },
    user_id: { type: String, required: true },
    purpose: { type: String, required: true },
    publication_date: { type: Date, default: Date.now },
    purpose_achieved: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
});

module.exports = model('pets', petSchema);