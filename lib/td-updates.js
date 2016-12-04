const $ = require('jquery');
const storage = require('./storage');

module.exports = {
  changeImportanceText: function(parentSelector, newImportance) {
    parentSelector.find('.importance-rating').text(newImportance);
  },

  upVoteChange: function(currentImportance) {
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
  },

  downVoteChange: function(currentImportance) {
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
  },

  updateTDStorage: function(id, attribute, newValue) {
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

};
