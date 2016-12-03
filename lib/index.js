/*jshint esversion: 6 */
require('./styles');
require('../css/main');
require('../css/reset');

let $ = require('jquery');
let TD = require('./new-td');
const storage = require('./storage');

let tdCount = 100;

$(document).ready(function(){
  loadStorage();
  //display array
  $('#save-button').on('click', formatNewTD);
});

function tdTemplate (tdCreator, obj) {
  let tdPageText = tdCreator;
  let deleteButton = createDeleteButton();
  let upVote = createUpVoteButton();
  let downVote = createDownVoteButton();
  let completeTD = createCompleteTDButton(obj);
  appendTDs(tdPageText, deleteButton, upVote, downVote, completeTD);
  deleteTDsListener(tdPageText, deleteButton, upVote, downVote, completeTD);
}

function formatNewTD() {
  let newTD = new TD(tdCount, $('#title-input').val(), $('#task-input').val());
  tdTemplate(createTD(newTD), newTD);
  storage.setTD(tdCount, newTD);
  clearFields();
  resetCounters();
  tdCount++;
  storage.setTDCount(tdCount);
}

function createTD(obj) {
  if (obj.completed === true) {
    return $("<article id=" + obj.id + " class='td-box completed-td'>"
        + "<div class='flexer'>"
          + "<h2 class='td-title' contenteditable='true'>" + obj.title + "</h2>"
        + "</div>"
        + "<p class='td-task' contenteditable='true'>" + obj.task + "</p>"
        + "<div class='importance-container'>"
        + "<h4 class='importance-rating'>" + obj.importance + "</h4></div></article>");
    } else return $("<article id=" + obj.id + " class='td-box'>"
      + "<div class='flexer'>"
        + "<h2 class='td-title' contenteditable='true'>" + obj.title + "</h2>"
      + "</div>"
      + "<p class='td-task' contenteditable='true'>" + obj.task + "</p>"
      + "<div class='importance-container'>"
      + "<h4 class='importance-rating'>" + obj.importance + "</h4></div></article>"
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

function createCompleteTDButton(obj) {
  let completeStatus = obj.completed;
  if (completeStatus === true) {
    return $("<button aria-label='complete to do' tabindex='0' class='completed-button' disabled>Completed</button>");
  } else return $("<button aria-label='complete to do' tabindex='0' class='completed-button'>Completed</button>");
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
    storage.removeTD(td.attr('id'));
  });
}

$('.td-container').on('click', '.completed-button', function() {
    let id = $(this).closest('.td-box').attr('id');
    let currentTD = $(this).closest('article');
    $(currentTD).addClass('completed-td');
    $(this).attr('disabled', true);
    updateTDStorage(id, 'completed', true);
});

function updateTDStorage(id, attribute, newValue) {
  let currentTD = storage.getTD(id);
  if (attribute === 'importance') {
    currentTD.quality = newValue;
  } else if (attribute === 'title') {
    currentTD.title = newValue;
  } else if (attribute === 'task') {
    currentTD.task = newValue;
  } else if (attribute === 'completed') {
    currentTD.completed = newValue;
  }
  storage.setTD(id, currentTD);
}

$('.td-container').on('click', '.up-button, .down-button', function() {
  let parentSelector = $(this).closest(".td-box");
  let id = parentSelector.attr('id');
  let storedTD = storage.getTD(id);
  let currentImportance = storedTD.importance;
  if ($(this).is(".up-button")) {
    storedTD.importance = upVoteChange(currentImportance);
  } else if ($(this).is(".down-button")) {
    storedTD.importance = downVoteChange(currentImportance);
  }
  changeImportanceText(parentSelector, storedTD.importance);
  checkButtons(storedTD);
  storage.setTD(id, storedTD);
});

function changeImportanceText(parentSelector, newImportance) {
  parentSelector.find('.importance-rating').text(newImportance);
}

function upVoteChange(currentImportance) {
  switch (currentImportance) {
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
}

function downVoteChange(currentImportance) {
  switch (currentImportance) {
    case '1) Critical':
    return '2) High';
    case '2) High':
    return '3) Normal';
    case '3) Normal':
    return '4) Low';
    case '4) Low':
    return '5) None';
    default:
    return '5) None';
  }
}

function resetTDCount() {
  let storedTDCount = storage.getTDCount();
  if (storedTDCount !== null) {
    tdCount = storedTDCount;
  }
}

function loadStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'tdCountTracker') {
      let storedTD = storage.getTD(localStorage.key(i));
      tdTemplate(createTD(storedTD), storedTD);
      checkButtons(storedTD);
    }
  }
  resetTDCount();
}

function checkButtons(obj) {
  let id = obj.id;
  debugger;
  let $completeButton = $(`#${id}`).children().children('.completed-button');
  let $upButton = $(`#${id}`).children().children('.up-button');
  let $downButton = $(`#${id}`).children().children('.down-button');
  if (obj.completed === 'true') {
    $completeButton.prop('disabled', true);
    $downButton.prop('disabled', true);
    $upButton.prop('disabled', true);
  }
  if (obj.importance === "5) None"){
    $downButton.prop('disabled', true);
  } else if (obj.importance === "4) Low" || obj.importance === "3) Normal" || obj.importance === "2) High") {
    $downButton.prop('disabled', false);
    $upButton.prop('disabled', false);
  } else if (obj.importance === "1) Critical") {
    $upButton.prop('disabled', true);
  }
}

$('#search-box').keyup(function(){
   let filter = $(this).val(), count = 0;
   $('article').each(function(){
     if ($(this).text().search(new RegExp(filter, "i")) < 0) {
       $(this).hide();
     } else {$(this).show();
       count++;
     }
   });
 });

function clearFields() {
  $('#title-input').val('');
  $('#task-input').val('');
  $('#save-button').prop('disabled', true);
}

$('#title-input').keyup(function() {
  let length = $(this).val().length;
  $('#title-input-char').text(length);
});

$('#task-input').keyup(function() {
  let length = $(this).val().length;
  $('#task-input-char').text(length);
});

function resetCounters() {
  $('#title-input-char').text(0);
  $('#task-input-char').text(0);
}

$('.all-input').keyup(function saveDisable() {
  if ($('#title-input').val() && $('#task-input').val()) {
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
});
