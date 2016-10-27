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

//creating new ideabox
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

//storage functionality
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

//load functions
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

//search
$(document).ready(function(){
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
});

//save button disable/enable
  $('.all-input').keyup(function saveDisable() {
    if ($title.val() && $body.val()) {
      $('#save-button').prop('disabled', false);
    } else {
      $('#save-button').prop('disabled', true);
    }
  });

//enter button to save
  $('.all-input').keypress(function(event){
    if (event.which == 13) {
      event.preventDefault();
      var newIdeaObject = new NewIdea(ideaCount, $title.val(), $body.val(), 'quality: swill');
      newIdeaBoxCreator(newIdeaObject);
      checkButtons(newIdeaObject);
      setIdeaStorage(ideaCount, newIdeaObject);
      ideaCount++;
      ideaCountStorage(ideaCount);
      $('#title-input').val('');
      $('#body-input').val('');
      $('#save-button').prop('disabled', true);
    }
  });

//button functionality
$('#save-button').on('click', function() {
    var newIdeaObject = new NewIdea(ideaCount, $title.val(), $body.val(), 'quality: swill');
    newIdeaBoxCreator(newIdeaObject);
    checkButtons(newIdeaObject);
    setIdeaStorage(ideaCount, newIdeaObject);
    ideaCount++;
    ideaCountStorage(ideaCount);
    $('#title-input').val('');
    $('#body-input').val('');
    $('#save-button').prop('disabled', true);
  });

$('.idea-container').on('click', '.delete-button', function() {
    var deleteID = $(this).parent().parent().attr('id');
    localStorage.removeItem(deleteID);
    $(this).parent().parent().remove();
});

$('.idea-container').on('click', '.up-button', function() {
    var $quality = $(this).siblings('.quality-rating');
    var $downButton = $(this).parent().children('.down-button');
    var $currentId = $(this).parent().parent().attr('id');
    if ($quality.text() === 'quality: swill') {
      $quality.text('quality: plausible');
      $(this).prop('disabled', false);
      $downButton.prop('disabled', false);
      updateIdea($currentId, 'quality','quality: plausible');
    } else if ($quality.text() === 'quality: plausible') {
      $quality.text('quality: genius');
      $(this).prop('disabled', true);
      $downButton.prop('disabled', false);
      updateIdea($currentId, 'quality','quality: genius');
    }
});

$('.idea-container').on('click', '.down-button', function() {
    var $quality = $(this).siblings('.quality-rating');
    var $upButton = $(this).parent().children('.up-button');
    var $currentId = $(this).parent().parent().attr('id');
    if ($quality.text() === 'quality: genius') {
      $quality.text('quality: plausible');
      $(this).prop('disabled', false);
      $upButton.prop('disabled', false);
      updateIdea($currentId, 'quality', "quality: plausible");
    } else if ($quality.text() === 'quality: plausible') {
      $quality.text('quality: swill');
      $(this).prop('disabled', true);
      $upButton.prop('disabled', false);
      updateIdea($currentId, 'quality', "quality: swill");
    }
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
      $(this).blur();
    }
});

$('.idea-container').on('keypress','.idea-body', function(event) {
    if(event.which == 13){
      $(this).blur();
    }

});
