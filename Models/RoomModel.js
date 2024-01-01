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
            file: {
                data: Buffer, // Store file data as Buffer (blob)
                filename: String,
                required:false,
                contentType: String, // Add content type if needed
                // You can add more fields like file size, file type, etc.
            },
        },
    ],
    timestamp: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model('Room', roomSchema);