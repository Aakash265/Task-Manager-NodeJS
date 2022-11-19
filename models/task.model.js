const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: 'This field is required.'
    },
    deadline: {
        type: Date
    },
});

mongoose.model('Task', taskSchema);