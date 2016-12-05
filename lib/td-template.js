const $ = require('jquery');
const storage = require('./storage');

module.exports = {
  tdHTML: function(obj) {
    if (obj.completed === true) {
      return $("<article id=" + obj.id + " class='td-box completed-td'>"
          + "<div class='flexer'>"
            + "<h2 class='td-title' name='td-title' contenteditable='true'>" + obj.title + "</h2>"
          + "</div>"
          + "<p class='td-task' name='task-title' contenteditable='true'>" + obj.task + "</p>"
          + "<div class='importance-container'>"
          + "<h4 class='importance-rating'>" + obj.importance + "</h4></div></article>");
      } else return $("<article id=" + obj.id + " class='td-box td-incomplete'>"
        + "<div class='flexer'>"
          + "<h2 class='td-title' contenteditable='true'>" + obj.title + "</h2>"
        + "</div>"
        + "<p class='td-task' contenteditable='true'>" + obj.task + "</p>"
        + "<div class='importance-container'>"
        + "<h4 class='importance-rating'>" + obj.importance + "</h4></div></article>"
      );
  },

  tdCreator: function(tdCreator, obj) {
    let tdPageText = tdCreator;
    let deleteButton = createDeleteButton();
    let upVote = createUpVoteButton(obj);
    let downVote = createDownVoteButton(obj);
    let completeTD = createCompleteTDButton(obj);
    prependTDs(obj, tdPageText, deleteButton, upVote, downVote, completeTD);
    deleteTDsListener(tdPageText, deleteButton, upVote, downVote, completeTD);
  }
};

function createDeleteButton() {
  return $("<button aria-label='delete to do' tabindex='0' class='delete-button'></button>");
}

function createUpVoteButton(obj) {
  if (obj.completed === true) {
    return $("<button aria-label='up vote todo' tabindex='0' class='up-button' disabled></button>");
    } else return $("<button aria-label='up vote todo' tabindex='0' class='up-button'></button>");
}


function createDownVoteButton(obj) {
  if (obj.completed ===true) {
    return $("<button aria-label='down vote todo' tabindex='0' class='down-button' disabled></button>");
  } else return $("<button aria-label='down vote todo' tabindex='0' class='down-button'></button>");
}

function createCompleteTDButton(obj) {
  let tdID = obj.id;
  let completeStatus = obj.completed;
  if (completeStatus === true) {
    return $("<button aria-label='complete to do' tabindex='0' class='completed-button' disabled>Completed</button>");
  } else return $("<button aria-label='complete to do' tabindex='0' class='completed-button'>Completed</button>");
}

function prependTDs(obj, td, deleteButton, upVote, downVote, completeTD) {
  if (obj.completed === true) {
  $('.td-container').prepend(td);
  td.find('.flexer').prepend(completeTD, deleteButton);
  td.find('.importance-container').prepend(upVote, downVote);
} else {
  $('.not-complete-tds').prepend(td);
  td.find('.flexer').prepend(completeTD, deleteButton);
  td.find('.importance-container').prepend(upVote, downVote);
  }
}

function deleteTDsListener(td, deleteButton, upVote, downVote, completeTD) {
  deleteButton.on('click', function() {
    td.remove();
    deleteButton.off().remove();
    upVote.off().remove();
    downVote.off().remove();
    completeTD.off().remove();
    storage.removeTD(td.attr('id'));
  });
}
