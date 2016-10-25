$(document).ready(function() {
  loadStorage();
});

var ideaCount = 100;
var $title = $('#title-input');
var $body = $('#body-input');

//creating new ideabox
function NewIdea() {
  this.id = ideaCount;
  this.title = $title.val();
  this.body = $body.val();
  this.quality = 3;
  /*jshint multistr: true */
  this.html = "<article class='idea-box' id=" + "'" + this.id + "'" + ">\
      <h2>" + this.title + "</h2>\
      <div class='quality-container'>\
      <button type='button' name='button' id='delete-button'></button>\
      <p>" + this.body + "</p>\
      <button type='button' name='button' id='up-button'></button>\
      <button type='button' name='button' id='down-button'></button>\
      <h4 id='quality-rating'>quality : swill</h4>\
      </div>\
    </article>";
    ideaCount++;
}

//storage functionality
function setIdeaStorage(id, object) {
  localStorage.setItem(id, JSON.stringify(object));
}

function ideaCountStorage(id) {
  localStorage.setItem(ideaCount, id);
}

function getStorage(id) {
  return JSON.parse(localStorage.getItem(id));
}

function loadStorage () {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === ideaCount) {
      $('ideaCount').val(localStorage.getItem(ideaCount));
    }
    else {
      var ideaInfo = getStorage(localStorage.key(i));
      $('.idea-container').prepend(ideaInfo.html);
    }
  }
}

//button functionality
$('#save-button').on('click', function() {
    var newIdeaBox = new NewIdea();
    setIdeaStorage(newIdeaBox.id, newIdeaBox);
    ideaCountStorage(newIdeaBox.id);
    $('#title-input').val('');
    $('#body-input').val('');
    $('.idea-container').prepend(newIdeaBox.html);
  });
