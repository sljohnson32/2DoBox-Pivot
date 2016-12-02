function NewTD(id, title, task, importance) {
  this.id = id;
  this.title = title;
  this.task = task;
  this.completed = false;
  this.importance = '3) Normal';
}

module.exports = NewTD;
