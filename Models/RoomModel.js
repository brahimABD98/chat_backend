const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: "New Room"
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            user: {
                type: String,
                required: true,
                ref: "User"
            },
            content: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    timestamp: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model('Room', roomSchema);