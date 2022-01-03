const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        
    }
})

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;