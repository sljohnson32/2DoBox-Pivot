const $ = require('jquery');

function newTDBoxCreator(object) {
  $('.td-container').prepend(`<article id=${object.id} class='td-box'>
      <div class='flexer'>
        <h2 class='td-title' contenteditable='true'>${object.title}</h2>
        <button type='button' name='button' class='delete-button'></button>
      </div>
      <p class='td-task' contenteditable='true'>${object.task}</p>
      <div class='quality-container'>
        <button type='button' name='button' class='up-button'></button>
        <button type='button' name='button' class='down-button'></button>
        <h4 class='quality-rating'>${object.quality}</h4>
      </div>
  </article>`);
}

module.exports = newTDBoxCreator;
