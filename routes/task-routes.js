'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var Task = require(__dirname + '/../models/task');
var handleError = require(__dirname + '/../lib/handle-server-error');

var tasksRouter = module.exports = exports = express.Router();

tasksRouter.get('/tasks', function(req, res) {
  Task.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

tasksRouter.post('/tasks', bodyParser.json(), function(req, res) {
  var newTask = new Task(req.body);
  newTask.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

tasksRouter.put('/tasks/:id', bodyParser.json(), function(req, res) {
  var taskData = req.body;
  delete taskData._id;
  Task.update({_id: req.params.id}, taskData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Task created.'});
  });
});

tasksRouter.delete('/tasks/:id', function(req, res) {
  Task.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Task removed.'});
  });
});
