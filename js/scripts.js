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
var $down = $('.down-button');

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
        <button type='button' name='button' class='up-button'></button>\
        <button type='button' name='button' disabled='true' class='down-button'></button>\
        <h4 class='quality-rating'>" + quality + "</h4>\
      </div>\
  </article>";
}


// NewIdea.keypress(function(event){
//   if (event.which == 13) {
//     $('#save-button').click();
//   }
// });

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


$(document).ready(function(){
 $('#search-box').keyup(function(){
   var filter = $(this).val(), count = 0;
   $('article').each(function(){
     if ($(this).text().search(new RegExp(filter, "i")) < 0) {
       $(this).hide();
     } else {
       $(this).show();
       count++;
     }
   });
 });
});

  $('.all-input').keyup(function saveDisable() {
    if ($title.val() && $body.val()) {
      $('#save-button').prop('disabled', false);
    } else {
      $('#save-button').prop('disabled', true);
    }
  });

//button functionality
$('#save-button').on('click', function() {
    $('.idea-container').prepend(NewIdea($title.val(), $body.val(), 'quality: swill'));
    setIdeaStorage(ideaCount, NewIdea($title.val(), $body.val(), 'quality: swill'));
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
