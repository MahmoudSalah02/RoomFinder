const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    number: Number,
    price: Number,
    building: String,
    image: String,
    rating: Number,
    review: String,
});

module.exports = mongoose.model('Room', RoomSchema);