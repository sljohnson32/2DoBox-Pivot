const $ = require('jquery');

function newTDBoxCreator(object) {
  $('.td-container').prepend(`<article id=${object.id} class='td-box'>
      <div class='flexer'>
        <h2 class='td-title' contenteditable='true'>${object.title}</h2>
        <button aria-label='complete to do' tabindex='0' class='completed-button'>Completed</button>
        <button aria-label='delete to do' tabindex='0' class='delete-button'></button>
      </div>
      <p class='td-task' contenteditable='true'>${object.task}</p>
      <div class='quality-container'>
        <button aria-label='up vote todo' tabindex='0' class='up-button'></button>
        <button aria-label='down vote todo' tabindex='0' class='down-button'></button>
        <h4 class='quality-rating'>${object.quality}</h4>
      </div>
  </article>`);
}

module.exports = newTDBoxCreator;
