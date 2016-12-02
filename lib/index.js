/*jshint esversion: 6 */
require('../css/main');
require('../css/reset');

let $ = require('jquery');
  // let TD = require('./new-td');

$(document).ready(function(){
  getStorage();
  $('#save-button').on('click', formatTDs);
});

let tdCount = 100;
let tdArray = [];

function tdTemplate () {
let td = createTD();
let deleteButton = createDeleteButton();
let upVote = createUpVoteButton();
let downVote = createDownVoteButton();
let completeTD = createCompleteTDButton();
appendTDs(td, deleteButton, upVote, downVote, completeTD);
deleteTDsListener(td, deleteButton, upVote, downVote, completeTD);
upVoteChange(upVote);
// completedListener();
}

function formatTDs() {
  tdTemplate();
  tdArray.push(new NewTD(tdCount, $('#title-input').val(), $('#task-input').val()));
  setStorage(tdArray);
  // findTD(tdCount, tdArray);
  clearFields();
  tdCount++;
}

function NewTD(id, title, task, importance) {
  this.id = id;
  this.title = title;
  this.task = task;
  this.completed = false;
  this.importance = importance || '3) Normal';
}

function createTD() {
  return $("<article id=" + tdCount + " class='td-box'>"
      + "<div class='flexer'>"
        + "<h2 class='td-title' contenteditable='true'>" + $('#title-input').val() + "</h2>"
      + "</div>"
      + "<p class='td-task' contenteditable='true'>" + $('#task-input').val() + "</p>"
      + "<div class='importance-container'>"
      + "<h4 class='importance-rating'>3) Normal</h4></div></article>"
    );
}

function createDeleteButton() {
  return $("<button aria-label='delete to do' tabindex='0' class='delete-button'></button>");
}

function createUpVoteButton() {
  return $("<button aria-label='up vote todo' tabindex='0' class='up-button'></button>");
}

function createDownVoteButton() {
  return $("<button aria-label='down vote todo' tabindex='0' class='down-button'></button>");
}

function createCompleteTDButton() {
  return $("<button aria-label='complete to do' tabindex='0' class='completed-button'>Completed</button>");
}

function appendTDs(td, deleteButton, upVote, downVote, completeTD) {
  $('.td-container').append(td);
  td.find('.flexer').append(completeTD, deleteButton);
  td.find('.importance-container').append(upVote, downVote);
}

function deleteTDsListener(td, deleteButton, upVote, downVote, completeTD) {
  deleteButton.on('click', function() {
    td.remove();
    deleteButton.off().remove();
    upVote.off().remove();
    downVote.off().remove();
    completeTD.off().remove();
  });
}

function upVoteChange(upVote) {
  upVote.on('click', function() {
    debugger;
    let id = upVote.parent().parent().attr('id');
    let storedArray = getStorage();
    let currentTD = findTD(id, storedArray);
    switch (currentTD.importance) {
      case '5) None':
        return '4) Low';
      case '4) Low':
        return '3) Normal';
      case '3) Normal':
        return '2) High';
      case '2) High':
        return '1) Critical';
      default:
        return '1) Critical';
    }
  });
}

function findTD(id, storedArray) {
  for(let i = 0; i < storedArray.length; i++) {
    if(storedArray[i].id === id) {
      return storedArray[i];
    }
  }
}

function setStorage(tdArray) {
  localStorage.setItem('storage', JSON.stringify(tdArray));
}

function getStorage() {
  return JSON.parse(localStorage.getItem('storage'));
}

// 1) Critical
//
// 2) High
//
// 3) Normal
//
// 4) Low
//
// 5) None

function clearFields() {
  $('#title-input').val('');
  $('#task-input').val('');
  // $('#save-button').prop('disabled', true);
}
