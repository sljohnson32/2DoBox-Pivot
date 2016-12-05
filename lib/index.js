/*jshint esversion: 6 */
require('../css/styles');
require('../css/main');
require('../css/reset');

const $ = require('jquery');
const TD = require('./new-td');
const storage = require('./storage');
const tdTemplate = require('./td-template');
const tdUpdate = require('./td-updates');
const utilities = require('./td-utilities');

$(document).ready(function(){
  utilities.loadStorage();
  $('#save-button').on('click', formatNewTD);
  utilities.showTenToDos();
  $('#title-input').focus();
});


function formatNewTD() {
  let tdCount = utilities.getTDCount();
  let newTD = new TD(tdCount, $('#title-input').val(), $('#task-input').val());
  tdTemplate.tdCreator(tdTemplate.tdHTML(newTD), newTD);
  storage.setTD(tdCount, newTD);
  utilities.clearFields();
  utilities.incrementTDCount();
  utilities.resetCounters();
  utilities.showTenToDos();
  $('#title-input').focus();
}

$("#show-more-todos").on('click', function(){
  utilities.showMoreTDs();
  utilities.showTenToDos();
});

$('.td-container').on('click', '.completed-button', function() {
    let id = $(this).closest('.td-box').attr('id');
    let currentTD = $(this).closest('article');
    $(currentTD).addClass('completed-td');
    $(currentTD).removeClass('.td-incomplete');
    $(this).attr('disabled', true);
    tdUpdate.updateTDStorage(id, 'completed', true);
    utilities.checkButtons(storage.getTD(id));
});

$('.td-container').on('click', '.up-button, .down-button', function() {
  let parentSelector = $(this).closest(".td-box");
  let id = parentSelector.attr('id');
  let storedTD = storage.getTD(id);
  let currentImportance = storedTD.importance;
  if ($(this).is(".up-button")) {
    storedTD.importance = tdUpdate.upVoteChange(currentImportance);
  } else if ($(this).is(".down-button")) {
    storedTD.importance = tdUpdate.downVoteChange(currentImportance);
  }
  tdUpdate.changeImportanceText(parentSelector, storedTD.importance);
  utilities.checkButtons(storedTD);
  storage.setTD(id, storedTD);
});

$('#filter-container').on('click', '#none-filter-button, #low-filter-button, #normal-filter-button, #high-filter-button, #critical-filter-button', function() {
  for (let i=0; i < localStorage.length; i++) {
    let clickedButtonImportance = $(this).text();
    let storedTD = storage.getTD(localStorage.key(i));
    let storedTDElement = $(`#${storedTD.id}`);
    let storedTDImportance = storedTD.importance;
    utilities.toggleShowHide(clickedButtonImportance, storedTDImportance, storedTDElement, storedTD);
  }
});

$('#show-completed-todos').on('click', function() {
  utilities.loadCompletes();
  utilities.showTenToDos();
});

$('#search-box').keyup(function(){
   let filter = $(this).val();
   $('article').each(function(){
     if ($(this).text().search(new RegExp(filter, "i")) < 0) {
       $(this).hide();
     } else if (utilities.getLoadCompletesStatus() === false) {
       $(this).show();
       $('.completed-td').hide();
     } else $(this).show();
   });
 });

$('#title-input').on('input', function() {
  let length = 120 - $(this).val().length;
  $('#title-input-char').text(length);
});

$('#task-input').on('input', function() {
  let length = 120 - $(this).val().length;
  $('#task-input-char').text(length);
});

$('.all-input').keyup(function saveDisable() {
  if ($('#title-input').val() && $('#task-input').val()) {
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
});

$('.td-container').on('blur','.td-title', function() {
  let closestID = this.closest('article').id;
  let newTitle = $(this).text();
  tdUpdate.updateTDStorage(closestID, 'title', newTitle);
});

$('.td-container').on('blur','.td-task', function() {
  let closestID = this.closest('article').id;
  let newBody = $(this).text();
  tdUpdate.updateTDStorage(closestID, 'task', newBody);
});

$('.td-container').on('keypress','.td-title', function(event) {
  if(event.which == 13) {
    event.preventDefault();
    $(this).blur();
  }
});

$('.td-container').on('keypress','.td-task', function(event) {
  if(event.which == 13){
    event.preventDefault();
    $(this).blur();
  }
});
