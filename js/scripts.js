$(document).ready(function() {
  loadStorage();
});

var ideaCount = 100;
var defaultQuality = 1;
var $title = $('#title-input');
var $body = $('#body-input');

//creating new ideabox
/*jshint multistr: true */
function NewIdea(title, body, quality) {
  return "<article class='idea-box'>\
      <div class='flexer'>\
        <h2>" + title + "</h2>\
        <button type='button' name='button' class='delete-button'></button>\
      </div>\
      <p>" + body + "</p>\
      <div class='quality-container'>\
        <article class='quality'>" + quality + "</article>\
        <button type='button' name='button' class='up-button'></button>\
        <button type='button' name='button' class='down-button'></button>\
        <h4 class='quality-rating'>quality: swill</h4>\
      </div>\
  </article>";
}

//storage functionality
function setIdeaStorage(id, object) {
  localStorage.setItem(id, JSON.stringify(object));
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

function loadStorage () {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'ideaCountTracker') {
      var ideaInfo = getStorage(localStorage.key(i));
      $('.idea-container').prepend(ideaInfo.html);
    }
  }
  getIdeaCount();
}

function getIdeaCount() {
    if (localStorage.getItem('ideaCountTracker') !== null) {
      ideaCount = JSON.parse(localStorage.getItem('ideaCountTracker'));
    }
      else {
        ideaCount = 100;
      }
}

function searchBox () {
  // User text should do a query search of two elements for simliar text
}

//button functionality
$('#save-button').on('click', function() {
    newIdeaBox = new NewIdea($title.val(), $body.val(), defaultQuality);
    $('.idea-container').prepend(newIdeaBox);
    setIdeaStorage(ideaCount, newIdeaBox);
    ideaCount++;
    ideaCountStorage(ideaCount);
    $('#title-input').val('');
    $('#body-input').val('');
  });

$('.idea-container').on('click', '.delete-button', function() {
    var deleteID = $(this).parent().parent().attr('id');
    localStorage.removeItem(deleteID);
    $(this).parent().parent().remove();
});

$('.idea-container').on('click', '.up-button', function() {
    var $quality = $(this).siblings('.quality-rating');
    if ($quality.text() === 'quality: swill') {
      $quality.text('quality: plausible');
    } else if ($quality.text() === 'quality: plausible') {
      $quality.text('quality: genius');
    } else {
      $quality.text('quality: swill');
    }
});

$('.idea-container').on('click', '.down-button', function() {
    var $quality = $(this).siblings('.quality-rating');
    if ($quality.text() === 'quality: genius') {
      $quality.text('quality: plausible');
    }
        else if ($quality.text() === 'quality: plausible') {
          $quality.text('quality: swill');
    }
          else {
            $quality.text('quality: genius');
    }
});
