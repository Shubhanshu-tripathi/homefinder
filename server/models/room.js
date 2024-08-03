const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },   
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: [String],
    available: {
        type: Boolean,
        default: true
    }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
