function NewTD(id, title, task) {
  this.id = id;
  this.title = title;
  this.task = task;
  this.completed = false;
  this.importance = '3) Normal';
}

module.exports = NewTD;
