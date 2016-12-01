/*jshint esversion: 6 */
require('../css/main');
require('../css/reset');

let $ = require('jquery');
  // let TD = require('./new-td');

$(document).ready(function(){
  $('#save-button').on('click', formatTDs);
});

let tdCount = 100;
let tdArray = [];

function formatTDs() {
  let td = createTD();
  let deleteButton = createDeleteButton();
  let upVote = createUpVoteButton();
  let downVote = createDownVoteButton();
  let completeTD = createCompleteTDButton();
  appendTDs(td, deleteButton, upVote, downVote, completeTD);
  deleteTDs(td, deleteButton, upVote, downVote, completeTD);
  tdArray.push(new NewTD(tdCount, $('#title-input').val(), $('#task-input').val(), $('#quality-rating').val()));
  clearFields();
  tdCount++;
  console.log(tdCount);
  console.log(tdArray);
}

function NewTD(id, title, task, quality) {
  this.id = id;
  this.title = title;
  this.task = task;
  this.completed = false;
  this.quality = quality;
}

function createTD() {
  return $("<article id=" + tdCount + "class='td-box'>"
      + "<div class='flexer'>"
        + "<h2 class='td-title' contenteditable='true'>" + $('#title-input').val() + "</h2>"
      + "</div>"
      + "<p class='td-task' contenteditable='true'>" + $('#task-input').val() + "</p>"
      + "<div class='quality-container'>"
      + "<h4>Quality: <span class='quality-rating'>Swill</span></h4></div></article>"
    );
}

function createDeleteButton() {
  return $("<button aria-label='delete to do' tabindex='0' class='delete-button'>Delete</button>");
}

function createUpVoteButton() {
  return $("<button aria-label='up vote todo' tabindex='0' class='up-button'>Up</button>");
}

function createDownVoteButton() {
  return $("<button aria-label='down vote todo' tabindex='0' class='down-button'>Down</button>");
}

function createCompleteTDButton() {
  return $("<button aria-label='complete to do' tabindex='0' class='completed-button'>Completed</button>");
}

function appendTDs(td, deleteButton, upVote, downVote, completeTD) {
  $('.td-container').append(td);
  $('.flexer').append(completeTD, deleteButton);
  $('.quality-container').append(upVote, downVote);
}

function deleteTDs(td, deleteButton, upVote, downVote, completeTD) {
  deleteButton.on('click', function() {
    td.remove();
    deleteButton.remove();
    upVote.remove();
    downVote.remove();
    completeTD.remove();
  });
}

function clearFields() {
  $('#title-input').val('');
  $('#task-input').val('');
  $('#save-button').prop('disabled', true);
}
