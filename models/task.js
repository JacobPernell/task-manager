'use strict';

var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  task: {
    type: String,
    default: '<Create a task>'
  },
  note: {
    type: String,
    default: '<Add a note>'
  }
});

module.exports = mongoose.model('Task', taskSchema);
