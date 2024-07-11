const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
         unique: true,
        
    },
    password: {
         type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
}  
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);
