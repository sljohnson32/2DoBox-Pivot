/*jshint esversion: 6 */
let $ = require('jquery');

(document). ready(function(){
  $('#submit-button').on('click', log.console('it works'));
});

function formatIdeas(){
  var idea = createIdea();
  var button = createButton();
  clearFields();
  appendIdeas(idea,button);
  deleteIdea(idea,button);
};
