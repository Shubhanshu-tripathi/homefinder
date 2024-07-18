
const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
},{ timestamps: true })


const Book = mongoose.model('Book', bookingSchema);
module.exports = Book