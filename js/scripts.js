var $title = $('#title-input');
var $body = $('#body-input');

function NewIdea() {
  this.title = $title.value;
  this.body = $body.value;
  /*jshint multistr: true */
  this.html = "<article class='idea-box'>\
      <h2>" + this.title + "</h2>\
      <button type='button' name='button' id='delete-button'></button>\
      <p>" + this.body + "</p>\
      <button type='button' name='button' id='up-button'></button>\
      <button type='button' name='button' id='down-button'></button>\
    </article>";
}

$('#save-button').on('click', function() {
    console.log("Save button is working");
    var newIdeaBox = new NewIdea();
    $('.idea-container').append(newIdeaBox.html);
  });
