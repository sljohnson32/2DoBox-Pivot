var ideaTitle = $('#title-input');
var ideaBody = $('#body-input');

function NewIdea(title, body) {
  this.title = newtitle;
  this.body = newbody;
  /*jshint multistr: true */
  this.idea =
    '<article class="idea-box">\
      <h2>' + this.title + '</h2>\
      <button type="button" name="button" id="delete-button"></button>\
      <p>' + this.body + '</p>\
      <button type="button" name="button" id="up-button"></button>\
      <button type="button" name="button" id="down-button"></button>\
    </article>';
}

$('#save-button').on('click', function() {
    new NewIdea (ideaTitle, ideaBody);
    $('.idea-containter').append(this.idea);
  });
