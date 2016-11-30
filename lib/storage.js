module.exports = {
  setTD: function(id, object){
    localStorage.setItem(id, JSON.stringify(object));
  },

  getTD: function(id){
    return JSON.parse(localStorage.getItem(id));
  },

  removeTD: function(id){
    localStorage.removeItem(id);
  },

  setTDCount: function(id){
    localStorage.setItem('tdCountTracker', id);
  },

  getTDCount: function(){
    return JSON.parse(localStorage.getItem('tdCountTracker'));
  },

};
