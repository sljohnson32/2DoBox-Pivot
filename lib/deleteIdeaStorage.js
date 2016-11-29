// function delete(id) {
//   localStorage.removeItem(id);
// }
//
// module.exports = delete;


// var lhelp = new localStorageHelper

module.exports = function(id) {
  localStorage.removeItem(id);
}



// module.exports = {
//   delete: function(id){},
//   add: function(){}
// }

// index.js

// var localStorageHelper = require('./del')

// localStorageHelper.delete(id)

// class localStorageHelper

function localStorageHelper (){
  this.stoage = localStorage;
}

localStorageHelper.prototype.delete = function(){

}

module.exports = localStorageHelper

// index.js

// var LocalStorageHelper = require('./del')

// var localStorageHelper = new LocalStorageHelper

// localStorageHelper.delete(id)
