const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    number: Nunmber,
    price: Number,
    building: String,
    image: String,
    rating: Number,
});

module.exports = mongoose.model('Room', RoomSchema);