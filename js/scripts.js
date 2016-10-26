$(document).ready(function() {
  loadStorage();
  $('#save-button').prop('disabled', true);
});

var ideaCount = 100;
var $title = $('#title-input');
var $body = $('#body-input');
var $userSearch = $('#search-box');
var $h2 = $('h2')
var $p = $('p');
var $down = $('.down-button');

//creating new ideabox
function NewIdea() {
  this.id = ideaCount;
  this.title = $title.val();
  this.body = $body.val();
  /*jshint multistr: true */
  this.html =
    "<article class='idea-box' id=" + "'" + this.id + "'" + ">\
        <div class='flexer'>\
          <h2 contenteditable='true'>" + this.title + "</h2>\
          <button type='button' name='button' class='delete-button'></button>\
        </div>\
        <p contenteditable='true'>" + this.body + "</p>\
        <div class='quality-container'>\
          <article class='quality'>" + 1 + "</article>\
          <button type='button' name='button' class='up-button'></button>\
          <button type='button' name='button' class='down-button' disabled ='false'></button>\
          <h4 class='quality-rating'>quality: swill</h4>\
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

function deleteIdeaStorage(id) {
  localStorage.removeItem(id);
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

$('#search-box').on('keyup change', function () {
  var user = $userSearch.val();
  return user;
});

 // User text should do a query search of two elements for simliar text
  // Can target $('h2') & $('p') to check against user...


  function search() {
    var user = $userSearch.val();
    return user;
  }

  $('.all-input').keyup(function saveDisable() {
    if ($title.val() && $body.val()) {
      $('#save-button').prop('disabled', false);
    } else {
      $('#save-button').prop('disabled', true);
    }
  });

//button functionality
$('#save-button').on('click', function() {
    var newIdeaBox = new NewIdea();
    saveDisable();
    setIdeaStorage(newIdeaBox.id, newIdeaBox);
    ideaCountStorage(newIdeaBox.id);
    $('#title-input').val('');
    $('#body-input').val('');
    $('.idea-container').prepend(newIdeaBox.html);
  });

$('.idea-container').on('click', '.delete-button', function() {
    $(this).parent().parent().remove();
});

$('.idea-container').on('click', '.up-button', function() {
    var $quality = $(this).siblings('.quality-rating');
    if ($quality.text() === 'quality: swill') {
      $quality.text('quality: plausible', false);
      $('.down-button').prop('disabled', false);
      $('.up-button').prop('disabled', false);
    }
        else if ($quality.text() === 'quality: plausible') {
          $quality.text('quality: genius');
          $('.up-button').prop('disabled', false);
    }
          else {
            $('.up-button').prop('disabled', true);
    }
});

$('.idea-container').on('click', '.down-button', function() {
    var $quality = $(this).siblings('.quality-rating');
    if ($quality.text() === 'quality: genius') {
      $quality.text('quality: plausible');
      $('.down-button').prop('disabled', false);
      $('.up-button').prop('disabled', false);
    }
        else if ($quality.text() === 'quality: plausible') {
          $quality.text('quality: swill');
          $('.down-button').prop('disabled', false);
    }
          else {
              $('.down-button').prop('disabled', true);
    }
});
