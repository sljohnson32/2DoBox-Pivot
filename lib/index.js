/*jshint esversion: 6 */
require('./styles');
require('../css/main');
require('../css/reset');

let $ = require('jquery');
let TD = require('./new-td');
const storage = require('./storage');

let tdCount = 100;
let tdLoadComplete = false;

function showTenToDos() {
  $(".td-box").hide();
  $(".td-box").slice(0, 10).show();
}

$(document).ready(function(){
  loadStorage(tdLoadComplete);
  $('#save-button').on('click', formatNewTD);
  showTenToDos();
  $('#title-input').focus();
});

$("#show-more-todos").on('click', function(){
    var showing = $(".td-box:visible").length;
    $(".td-box").slice(showing - 1, showing + 10).show();
});

function tdTemplate (tdCreator, obj) {
  let tdPageText = tdCreator;
  let deleteButton = createDeleteButton();
  let upVote = createUpVoteButton();
  let downVote = createDownVoteButton();
  let completeTD = createCompleteTDButton(obj);
  prependTDs(tdPageText, deleteButton, upVote, downVote, completeTD);
  deleteTDsListener(tdPageText, deleteButton, upVote, downVote, completeTD);
}

function formatNewTD() {
  let end = 2;
  $( "article" ).slice( 0, end ).show();
  let newTD = new TD(tdCount, $('#title-input').val(), $('#task-input').val());
  tdTemplate(createTD(newTD), newTD);
  storage.setTD(tdCount, newTD);
  clearFields();
  resetCounters();
  tdCount++;
  storage.setTDCount(tdCount);
  showTenToDos();
  $('#title-input').focus();
  // sortByCompletedStatus(newTD);
}

function createTD(obj) {
  if (obj.completed === true) {
    return $("<article id=" + obj.id + " class='td-box completed-td'>"
        + "<div class='flexer'>"
          + "<h2 class='td-title' contenteditable='true'>" + obj.title + "</h2>"
        + "</div>"
        + "<p class='td-task' contenteditable='true'>" + obj.task + "</p>"
        + "<div class='importance-container'>"
        + "<h4 class='importance-rating'>" + obj.importance + "</h4></div></article>");
    } else return $("<article id=" + obj.id + " class='td-box'>"
      + "<div class='flexer'>"
        + "<h2 class='td-title' contenteditable='true'>" + obj.title + "</h2>"
      + "</div>"
      + "<p class='td-task' contenteditable='true'>" + obj.task + "</p>"
      + "<div class='importance-container'>"
      + "<h4 class='importance-rating'>" + obj.importance + "</h4></div></article>"
    );
}

function createDeleteButton() {
  return $("<button aria-label='delete to do' tabindex='0' class='delete-button'></button>");
}

function createUpVoteButton() {
  return $("<button aria-label='up vote todo' tabindex='0' class='up-button'></button>");
}

function createDownVoteButton() {
  return $("<button aria-label='down vote todo' tabindex='0' class='down-button'></button>");
}

function createCompleteTDButton(obj) {
  let completeStatus = obj.completed;
  if (completeStatus === true) {
    return $("<button aria-label='complete to do' tabindex='0' class='completed-button' disabled>Completed</button>");
  } else return $("<button aria-label='complete to do' tabindex='0' class='completed-button'>Completed</button>");
}

function prependTDs(td, deleteButton, upVote, downVote, completeTD) {
  $('.td-container').prepend(td);
  td.find('.flexer').prepend(completeTD, deleteButton);
  td.find('.importance-container').prepend(upVote, downVote);
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

$('.td-container').on('click', '.completed-button', function() {
    let id = $(this).closest('.td-box').attr('id');
    let currentTD = $(this).closest('article');
    $(currentTD).addClass('completed-td');
    $(this).attr('disabled', true);
    updateTDStorage(id, 'completed', true);
});

function updateTDStorage(id, attribute, newValue) {
  let currentTD = storage.getTD(id);
  if (attribute === 'importance') {
    currentTD.quality = newValue;
  } else if (attribute === 'title') {
    currentTD.title = newValue;
  } else if (attribute === 'task') {
    currentTD.task = newValue;
  } else if (attribute === 'completed') {
    currentTD.completed = newValue;
  }
  storage.setTD(id, currentTD);
}

$('.td-container').on('click', '.up-button, .down-button', function() {
  let parentSelector = $(this).closest(".td-box");
  let id = parentSelector.attr('id');
  let storedTD = storage.getTD(id);
  let currentImportance = storedTD.importance;
  if ($(this).is(".up-button")) {
    storedTD.importance = upVoteChange(currentImportance);
  } else if ($(this).is(".down-button")) {
    storedTD.importance = downVoteChange(currentImportance);
  }
  changeImportanceText(parentSelector, storedTD.importance);
  checkButtons(storedTD);
  storage.setTD(id, storedTD);
});

//need to figure out how to unfilter - either with a click on the sme button again OR with a "show all" - think we should also add some CSS to show the selected button highlighted/selected
$('#filter-container').on('click', '#none-filter-button, #low-filter-button, #normal-filter-button, #high-filter-button, #critical-filter-button', function() {
  // let filterToggle;
  for (let i=0; i < localStorage.length; i++) {
    let clickedButtonImportance = $(this).text();
    let storedTD = storage.getTD(localStorage.key(i));
    console.log(storedTD);
    let storedTDElement = $(`#${storedTD.id}`);
    let storedTDImportance = storedTD.importance;
    // if (filterToggle = 'clicked') {
    //   for (let i=0; i < localStorage.length; i++) {
    //     storedTDElement.show();
    //     filterToggle = 'not clicked';
    //   }
    // }
    toggleShowHide(clickedButtonImportance, storedTDImportance, storedTDElement);
  }
});


// $("#show-completed-todos").on('click', function(){
//   for (let i=0; i < localStorage.length; i++) {
//     let storedTD = storage.getTD(localStorage.key(i));
//     let storedTDElement = $(`#${storedTD.id}`);
//     let storedTDCompleted = storedTD.completed;
//   }
// //if storedTDCompleted === true, then
// });
//
// // function sortByCompletedStatus(object) {
// //   object.sort(function() {
// //     if(object.completed === true) {
// //       1;
// //     }
// //   });
// //   console.log(object.completed);
// // }
//
// function sortByCompletedStatus(object) {
//   let objectArray = [];
//   objectArray.push(object);
//   // console.log(objectArray);
//   object.completed.sort(function(x, y) {
//     return (x === y)? 0 : x? -1 : 1;
//   });
//   // console.log(object);
// }

// a.sort(function(x, y) {
//     // true values first
//     return (x === y)? 0 : x? -1 : 1;
//     // false values first
//     // return (x === y)? 0 : x? 1 : -1;
// });
//
// console.log(a);

// // sort by name
// items.sort(function(a, b) {
//   var nameA = a.name.toUpperCase(); // ignore upper and lowercase
//   var nameB = b.name.toUpperCase(); // ignore upper and lowercase
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }
//
//   // names must be equal
//   return 0;
// });
//
// var items = [
//   { name: 'Edward', value: 21 },
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 },
//   { name: 'Magnetic' },
//   { name: 'Zeros', value: 37 }
// ];

function toggleShowHide(clickedButtonImportance, storedTDImportance, storedTDElement) {
  if (clickedButtonImportance === storedTDImportance) {
    storedTDElement.show();
    // filterToggle = 'clicked';
  }
  else {
    storedTDElement.hide();
    // filterToggle = 'not clicked';
  }
}

function changeImportanceText(parentSelector, newImportance) {
  parentSelector.find('.importance-rating').text(newImportance);
}

function upVoteChange(currentImportance) {
  switch (currentImportance) {
    case '5) None':
    return '4) Low';
    case '4) Low':
    return '3) Normal';
    case '3) Normal':
    return '2) High';
    case '2) High':
    return '1) Critical';
    default:
    return '1) Critical';
  }
}

function downVoteChange(currentImportance) {
  switch (currentImportance) {
    case '1) Critical':
    return '2) High';
    case '2) High':
    return '3) Normal';
    case '3) Normal':
    return '4) Low';
    case '4) Low':
    return '5) None';
    default:
    return '5) None';
  }
}

function resetTDCount() {
  let storedTDCount = storage.getTDCount();
  if (storedTDCount !== null) {
    tdCount = storedTDCount;
  }
}

function loadStorage(tdLoadComplete) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'tdCountTracker') {
      let storedTD = storage.getTD(localStorage.key(i));
      if (tdLoadComplete === false && storedTD.completed === false) {
        tdTemplate(createTD(storedTD), storedTD);
        checkButtons(storedTD);
      } else if (tdLoadComplete === true) {
        tdTemplate(createTD(storedTD), storedTD);
        checkButtons(storedTD);
        }
    }
  }
  resetTDCount();
}

$('#show-completed-todos').on('click', function() {
  tdLoadComplete = true;
  clearTDs();
  loadStorage(tdLoadComplete);
  $('#save-button').on('click', formatNewTD);
  showTenToDos();
  $('#title-input').focus();
});

function clearTDs() {
  $('.td-container').text('');
}

//we need to update the code here to make sure we are disabling the down/up buttons for completed tasks
function checkButtons(obj) {
  let id = obj.id;
  let $completeButton = $(`#${id}`).children().children('.completed-button');
  let $upButton = $(`#${id}`).children().children('.up-button');
  let $downButton = $(`#${id}`).children().children('.down-button');
  if (obj.completed === 'true') {
    $completeButton.prop('disabled', true);
    $downButton.prop('disabled', true);
    $upButton.prop('disabled', true);
  }
  if (obj.importance === "5) None"){
    $downButton.prop('disabled', true);
    } else if (obj.importance === "4) Low" || obj.importance === "3) Normal" || obj.importance === "2) High") {
      $downButton.prop('disabled', false);
      $upButton.prop('disabled', false);
      } else if (obj.importance === "1) Critical") {
        $upButton.prop('disabled', true);
      }
}

$('#search-box').keyup(function(){
   let filter = $(this).val(), count = 0;
   $('article').each(function(){
     if ($(this).text().search(new RegExp(filter, "i")) < 0) {
       $(this).hide();
     } else {$(this).show();
       count++;
     }
   });
 });

function clearFields() {
  $('#title-input').val('');
  $('#task-input').val('');
  $('#save-button').prop('disabled', true);
}

$('#title-input').on('input', function() {
  let length = 120 - $(this).val().length;
  $('#title-input-char').text(length);
});

$('#task-input').on('input', function() {
  let length = 120 - $(this).val().length;
  $('#task-input-char').text(length);
});

function resetCounters() {
  $('#title-input-char').text(120);
  $('#task-input-char').text(120);
}

$('.all-input').keyup(function saveDisable() {
  if ($('#title-input').val() && $('#task-input').val()) {
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
});
