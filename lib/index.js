require('./styles');
require('../css/main');
require('../css/reset');

var $ = require('jquery');

$(document).ready(function() {
  loadStorage();
  $('#save-button').prop('disabled', true);
});

var tdCount = 100;
var $title = $('#title-input');
var $task = $('#task-input');
var $userSearch = $('#search-box');
var $h2 = $('h2');
var $p = $('p');

function NewTD(id, title, task, quality) {
  this.id = id;
  this.title = title;
  this.task = task;
  this.quality = quality;
}

function newTDBoxCreator(object) {
  $('.td-container').prepend(`<article id=${object.id} class='td-box'>
      <div class='flexer'>
        <h2 class='td-title' contenteditable='true'>${object.title}</h2>
        <button type='button' name='button' class='delete-button'></button>
      </div>
      <p class='td-task' contenteditable='true'>${object.task}</p>
      <div class='quality-container'>
        <button type='button' name='button' class='up-button'></button>
        <button type='button' name='button' class='down-button'></button>
        <h4 class='quality-rating'>${object.quality}</h4>
      </div>
  </article>`);
}

function setTDStorage(id, object) {
  localStorage.setItem(id, JSON.stringify(object));
}

function updateTD(id, attribute, newValue) {
  var currentTD = getStorage(id);
  if (attribute === 'quality') {
    currentTD.quality = newValue;
  } else if (attribute === 'title') {
    currentTD.title = newValue;
  } else if (attribute === 'task') {
    currentTD.task = newValue;
  }
  setTDStorage(id, currentTD);
}

function tdCountStorage(id) {
  localStorage.setItem('tdCountTracker', id);
}

function getStorage(id) {
  return JSON.parse(localStorage.getItem(id));
}

// var deleteIdeaStorage = require('./deleteIdeaStorage')
function deleteTDStorage(id) {
  localStorage.removeItem(id);
}

function getTDCount() {
  if (localStorage.getItem('tdCountTracker') !== null) {
    tdCount = JSON.parse(localStorage.getItem('tdCountTracker'));
  } else {
    tdCount = 100;
    }
}

function loadStorage () {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'tdCountTracker') {
      var storedInfo = getStorage(localStorage.key(i));
      newTDBoxCreator(storedInfo);
      checkButtons(storedInfo);
    }
  }
  getTDCount();
}

function clearFields() {
  $title.val('');
  $task.val('');
  $('#save-button').prop('disabled', true);
}

function checkButtons(object) {
  var id = object.id;
  var $upButton = $(`#${id}`).children().children('.up-button');
  var $downButton = $(`#${id}`).children().children('.down-button');
  if (object.quality === "quality: swill") {
    $downButton.prop('disabled', true);
  } else if (object.quality === "quality: plausible") {
    $downButton.prop('disabled', false);
    $upButton.prop('disabled', false);
  } else if (object.quality === "quality: genius") {
    $upButton.prop('disabled', true);
  }
}

function upVote(arg) {
  var $quality = arg.siblings('.quality-rating');
  var $downButton = arg.parent().children('.down-button');
  var $currentId = arg.parent().parent().attr('id');
  if ($quality.text() === 'quality: swill') {
    $quality.text('quality: plausible');
    arg.prop('disabled', false);
    $downButton.prop('disabled', false);
    updateTD($currentId, 'quality','quality: plausible');
  } else if ($quality.text() === 'quality: plausible') {
    $quality.text('quality: genius');
    arg.prop('disabled', true);
    $downButton.prop('disabled', false);
    updateTD($currentId, 'quality','quality: genius');
  }
}

function downVote(arg) {
  var $quality = arg.siblings('.quality-rating');
  var $upButton = arg.parent().children('.up-button');
  var $currentId = arg.parent().parent().attr('id');
  if ($quality.text() === 'quality: genius') {
    $quality.text('quality: plausible');
    arg.prop('disabled', false);
    $upButton.prop('disabled', false);
    updateTD($currentId, 'quality', "quality: plausible");
  } else if ($quality.text() === 'quality: plausible') {
    $quality.text('quality: swill');
    arg.prop('disabled', true);
    $upButton.prop('disabled', false);
    updateTD($currentId, 'quality', "quality: swill");
  }
}

function mainFunction(obj){
  newTDBoxCreator(obj);
  checkButtons(obj);
  setTDStorage(tdCount, obj);
  tdCount++;
  tdCountStorage(tdCount);
  clearFields();
}

$('#search-box').keyup(function(){
   var filter = $(this).val(), count = 0;
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
    var newTDObject = new NewTD(tdCount, $title.val(), $task.val(), 'quality: swill');
    mainFunction(newTDObject);
  }
});

$('#save-button').on('click', function() {
  var newTDObject = new NewTD(tdCount, $title.val(), $task.val(), 'quality: swill');
  mainFunction(newTDObject);
});

$('.td-container').on('click', '.delete-button', function() {
  var deleteID = $(this).parent().parent().attr('id');
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
  var closestID = this.closest('article').id;
  var newTitle = $(this).text();
  updateTD(closestID, 'title', newTitle);
});

$('.td-container').on('blur','.td-task', function() {
  var closestID = this.closest('article').id;
  var newBody = $(this).text();
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
