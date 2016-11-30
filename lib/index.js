require('./styles');
require('../css/main');
require('../css/reset');
require('./vote');
let NewTD = require('./new-td');
let newTDBoxCreator = require('./box-creator');

let $ = require('jquery');
const storage = require('./storage');

$(document).ready(function() {
  loadStorage();
  $('#save-button').prop('disabled', true);
});

let tdCount = 100;
let $title = $('#title-input');
let $task = $('#task-input');
let $userSearch = $('#search-box');
let $h2 = $('h2');
let $p = $('p');

function updateTD(id, attribute, newValue) {
  let currentTD = storage.getTD(id);
  if (attribute === 'quality') {
    currentTD.quality = newValue;
  } else if (attribute === 'title') {
    currentTD.title = newValue;
  } else if (attribute === 'task') {
    currentTD.task = newValue;
  }
  storage.setTD(id, currentTD);
}

function resetTDCount() {
  let storedTDCount = storage.getTDCount();
  console.log("storedTDCount: ", storedTDCount);
  if (storedTDCount !== null) {
    tdCount = storedTDCount;
  } else {
    tdCount = 100;
    }
}

function loadStorage () {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'tdCountTracker') {
      let storedInfo = storage.getTD(localStorage.key(i));
      newTDBoxCreator(storedInfo);
      checkButtons(storedInfo);
    }
  }
  resetTDCount();
  console.log(tdCount);
}

function clearFields() {
  $title.val('');
  $task.val('');
  $('#save-button').prop('disabled', true);
}

function checkButtons(object) {
  let id = object.id;
  let $upButton = $(`#${id}`).children().children('.up-button');
  let $downButton = $(`#${id}`).children().children('.down-button');
  if (object.quality === "quality: swill") {
    $downButton.prop('disabled', true);
  } else if (object.quality === "quality: plausible") {
    $downButton.prop('disabled', false);
    $upButton.prop('disabled', false);
  } else if (object.quality === "quality: genius") {
    $upButton.prop('disabled', true);
  }
}

// function upVote(arg) {
//   let $quality = arg.siblings('.quality-rating');
//   let $downButton = arg.parent().children('.down-button');
//   let $currentId = arg.parent().parent().attr('id');
//   if ($quality.text() === 'quality: swill') {
//     $quality.text('quality: plausible');
//     arg.prop('disabled', false);
//     $downButton.prop('disabled', false);
//     updateTD($currentId, 'quality','quality: plausible');
//   } else if ($quality.text() === 'quality: plausible') {
//     $quality.text('quality: genius');
//     arg.prop('disabled', true);
//     $downButton.prop('disabled', false);
//     updateTD($currentId, 'quality','quality: genius');
//   }
// }
//
// function downVote(arg) {
//   let $quality = arg.siblings('.quality-rating');
//   let $upButton = arg.parent().children('.up-button');
//   let $currentId = arg.parent().parent().attr('id');
//   if ($quality.text() === 'quality: genius') {
//     $quality.text('quality: plausible');
//     arg.prop('disabled', false);
//     $upButton.prop('disabled', false);
//     updateTD($currentId, 'quality', "quality: plausible");
//   } else if ($quality.text() === 'quality: plausible') {
//     $quality.text('quality: swill');
//     arg.prop('disabled', true);
//     $upButton.prop('disabled', false);
//     updateTD($currentId, 'quality', "quality: swill");
//   }
// }

function mainFunction(obj){
  newTDBoxCreator(obj);
  checkButtons(obj);
  storage.setTD(tdCount, obj);
  tdCount++;
  storage.setTDCount(tdCount);
  clearFields();
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

$('.all-input').keyup(function saveDisable() {
  if ($title.val() && $task.val()) {
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
});

$('.all-input').keypress(function(event){
  if (event.which == 13 && $title.val() && $task.val()) {
    event.preventDefault();
    let newTDObject = new NewTD(tdCount, $title.val(), $task.val(), 'quality: swill');
    mainFunction(newTDObject);
  }
});

$('#save-button').on('click', function() {
  let newTDObject = new NewTD(tdCount, $title.val(), $task.val(), 'quality: swill');
  mainFunction(newTDObject);
});

$('.td-container').on('click', '.delete-button', function() {
  let deleteID = $(this).parent().parent().attr('id');
  localStorage.removeItem(deleteID);
  $(this).parent().parent().remove();
});

$('.td-container').on('click', '.up-button', function() {
  upVote($(this));
});


$('.td-container').on('click', '.down-button', function() {
  downVote($(this));
});


$('.td-container').on('blur','.td-title', function() {
  let closestID = this.closest('article').id;
  let newTitle = $(this).text();
  updateTD(closestID, 'title', newTitle);
});

$('.td-container').on('blur','.td-task', function() {
  let closestID = this.closest('article').id;
  let newBody = $(this).text();
  updateTD(closestID, 'task', newBody);
});

$('.td-container').on('keypress','.td-title', function(event) {
  if(event.which == 13) {
    event.preventDefault();
    $(this).blur();
  }
});

$('.td-container').on('keypress','.td-task', function(event) {
  if(event.which == 13){
    event.preventDefault();
    $(this).blur();
  }
});
