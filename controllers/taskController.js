const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

router.get('/', (req, res) => {
    res.render("task/addOrEdit", {
        viewTitle: "What is your main focus today?",
    });
});

const updateRecord = (req, res) => {
    Task.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('task/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("task/addOrEdit", {
                    viewTitle: 'Update Task',
                    task: req.body
                });
            }
            else {
                console.log("Error during record update: " + err);
            }
        }
    });
};

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
});

const insertRecord = (req, res) => {
    var task = new Task();
    task.taskName = req.body.taskName;
    task.deadline = req.body.deadline;
    task.save((err, doc) => {
        if (!err) {
            res.redirect('task/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('task/addOrEdit', {
                    viewTitle: "What is your main focus today?",
                    task: req.body
                });
            }
            console.log("Error during record insertion: " + err);
        }
    });
};

router.get('/list', (req, res) => {
    Task.find((err, docs) => {
        if (!err) {
            res.render('task/list', {
                list: docs
            });
        }
        else {
            console.log("Error in retrieving Task list :" + err);
        }
    }).lean();
});

const handleValidationError = (err, body) => {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'taskName':
                body['taskNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
};

router.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("task/addOrEdit", {
                viewTitle: "Update Task",
                task: doc
            });
        }
    }).lean();
});

router.get('/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/task/list');
        }
        else {
            console.log("Error in task deletion: " + err);
        }
    });
});

module.exports = router;