/*jshint esversion: 6 */
const $ = require('jquery');
const storage = require('./storage');
const tdTemplate = require('./td-template');

module.exports = {
  checkButtons: function(obj) {
    let id = obj.id;
    let $completeButton = $(`#${id}`).children().children('.completed-button');
    let $upButton = $(`#${id}`).children().children('.up-button');
    let $downButton = $(`#${id}`).children().children('.down-button');
    if (obj.completed === true) {
      $completeButton.prop('disabled', true);
      $downButton.prop('disabled', true);
      $upButton.prop('disabled', true);
    } else if (obj.importance === "5) None"){
      $downButton.prop('disabled', true);
      } else if (obj.importance === "4) Low" || obj.importance === "3) Normal" || obj.importance === "2) High") {
        $downButton.prop('disabled', false);
        $upButton.prop('disabled', false);
        } else if (obj.importance === "1) Critical") {
          $upButton.prop('disabled', true);
        }
  },

  clearFields: function() {
    $('#title-input').val('');
    $('#task-input').val('');
    $('#save-button').prop('disabled', true);
  },

  getTDCount: function() {
    return tdCount;
  },

  incrementTDCount: function() {
    tdCount++;
    storage.setTDCount(tdCount);
  },

  loadStorage: function() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) !== 'tdCountTracker') {
        let storedTD = storage.getTD(localStorage.key(i));
          tdTemplate.tdCreator(tdTemplate.tdHTML(storedTD), storedTD);
          checkButtons(storedTD);
        }
    }
    resetTDCount();
  },

  toggleShowHide: function(clickedButtonImportance, storedTDImportance, storedTDElement) {
    if (clickedButtonImportance === storedTDImportance) {
      storedTDElement.show();
    }
    else {
      storedTDElement.hide();
    }
  }

};

let tdCount = 100;

function checkButtons(obj) {
  let id = obj.id;
  let $completeButton = $(`#${id}`).children().children('.completed-button');
  let $upButton = $(`#${id}`).children().children('.up-button');
  let $downButton = $(`#${id}`).children().children('.down-button');
  if (obj.completed === true) {
    $completeButton.prop('disabled', true);
    $downButton.prop('disabled', true);
    $upButton.prop('disabled', true);
  } else if (obj.importance === "5) None"){
    $downButton.prop('disabled', true);
    } else if (obj.importance === "4) Low" || obj.importance === "3) Normal" || obj.importance === "2) High") {
      $downButton.prop('disabled', false);
      $upButton.prop('disabled', false);
      } else if (obj.importance === "1) Critical") {
        $upButton.prop('disabled', true);
      }
}

function resetTDCount() {
  let storedTDCount = storage.getTDCount();
  if (storedTDCount !== null) {
    tdCount = storedTDCount;
  }
}
