$(document).ready(function() {
  loadStorage();
  $('#save-button').prop('disabled', true);
});

var ideaCount = 100;
var $title = $('#title-input');
var $body = $('#body-input');
var $userSearch = $('#search-box');
var $h2 = $('h2');
var $p = $('p');

function NewIdea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function newIdeaBoxCreator(object) {
  $('.idea-container').prepend(`<article id=${object.id} class='idea-box'>
      <div class='flexer'>
        <h2 class='idea-title' contenteditable='true'>${object.title}</h2>
        <button type='button' name='button' class='delete-button'></button>
      </div>
      <p class='idea-body' contenteditable='true'>${object.body}</p>
      <div class='quality-container'>
        <button type='button' name='button' class='up-button'></button>
        <button type='button' name='button' class='down-button'></button>
        <h4 class='quality-rating'>${object.quality}</h4>
      </div>
  </article>`);
}

function setIdeaStorage(id, object) {
  localStorage.setItem(id, JSON.stringify(object));
}

function updateIdea(id, attribute, newValue) {
  var currentIdea = getStorage(id);
  if (attribute === 'quality') {
    currentIdea.quality = newValue;
  } else if (attribute === 'title') {
    currentIdea.title = newValue;
  } else if (attribute === 'body') {
    currentIdea.body = newValue;
  }
  setIdeaStorage(id, currentIdea);
}

function ideaCountStorage(id) {
  localStorage.setItem('ideaCountTracker', id);
}

function getStorage(id) {
  return JSON.parse(localStorage.getItem(id));
}

function deleteIdeaStorage(id) {
  localStorage.removeItem(id);
}

function getIdeaCount() {
  if (localStorage.getItem('ideaCountTracker') !== null) {
    ideaCount = JSON.parse(localStorage.getItem('ideaCountTracker'));
  } else {
    ideaCount = 100;
    }
}

function loadStorage () {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'ideaCountTracker') {
      var storedInfo = getStorage(localStorage.key(i));
      newIdeaBoxCreator(storedInfo);
      checkButtons(storedInfo);
    }
  }
  getIdeaCount();
}

function clearFields() {
  $title.val('');
  $body.val('');
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
    updateIdea($currentId, 'quality','quality: plausible');
  } else if ($quality.text() === 'quality: plausible') {
    $quality.text('quality: genius');
    arg.prop('disabled', true);
    $downButton.prop('disabled', false);
    updateIdea($currentId, 'quality','quality: genius');
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
    updateIdea($currentId, 'quality', "quality: plausible");
  } else if ($quality.text() === 'quality: plausible') {
    $quality.text('quality: swill');
    arg.prop('disabled', true);
    $upButton.prop('disabled', false);
    updateIdea($currentId, 'quality', "quality: swill");
  }
}

function mainFunction(obj){
  newIdeaBoxCreator(obj);
  checkButtons(obj);
  setIdeaStorage(ideaCount, obj);
  ideaCount++;
  ideaCountStorage(ideaCount);
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
  if ($title.val() && $body.val()) {
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
});

$('.all-input').keypress(function(event){
  if (event.which == 13 && $title.val() && $body.val()) {
    event.preventDefault();
    var newIdeaObject = new NewIdea(ideaCount, $title.val(), $body.val(), 'quality: swill');
    mainFunction(newIdeaObject);
  }
});

$('#save-button').on('click', function() {
  var newIdeaObject = new NewIdea(ideaCount, $title.val(), $body.val(), 'quality: swill');
  mainFunction(newIdeaObject);
});

$('.idea-container').on('click', '.delete-button', function() {
  var deleteID = $(this).parent().parent().attr('id');
  localStorage.removeItem(deleteID);
  $(this).parent().parent().remove();
});

$('.idea-container').on('click', '.up-button', function() {
  upVote($(this));
});


$('.idea-container').on('click', '.down-button', function() {
  downVote($(this));
});


$('.idea-container').on('blur','.idea-title', function() {
  var closestID = this.closest('article').id;
  var newTitle = $(this).text();
  updateIdea(closestID, 'title', newTitle);
});

$('.idea-container').on('blur','.idea-body', function() {
  var closestID = this.closest('article').id;
  var newBody = $(this).text();
  updateIdea(closestID, 'body', newBody);
});

$('.idea-container').on('keypress','.idea-title', function(event) {
  if(event.which == 13) {
    event.preventDefault();
    $(this).blur();
  }
});

$('.idea-container').on('keypress','.idea-body', function(event) {
  if(event.which == 13){
    event.preventDefault();
    $(this).blur();
  }
});
