function ideaTitle() {
  return $('#title-input').val;
}
function ideaBody() {
  return $('#body-input').val;
}

function NewIdea() {
  debugger;
  this.title = ideaTitle();
  this.body = ideaBody();
  /*jshint multistr: true */
  this.ideaBox = '<article class="idea-box">\
      <h2>' + this.title + '</h2>\
      <button type="button" name="button" id="delete-button"></button>\
      <p>' + this.body + '</p>\
      <button type="button" name="button" id="up-button"></button>\
      <button type="button" name="button" id="down-button"></button>\
    </article>';
}

$('#save-button').on('click', function() {
    var newIdeaBox = new NewIdea();
    $('.idea-containter').append(newIdeaBox.ideaBox);
  });
