/*jshint esversion: 6 */
const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

describe('new functionality bundle', function () {
  it('should work', function () {
    assert(true);
  });
});

test.describe('testing todobox', ()=>{
  let driver;
  beforeEach(()=>{
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
    driver.get('http://localhost:8080');
  });

  test.afterEach(()=>{
    driver.quit();
  });

  test.it('should allow me to enter a title and a task', ()=>{
    const title = driver.findElement({name: 'title'});
    const task = driver.findElement({name: 'task'});

    title.sendKeys('this is a title').then( ()=>{
      return title.getAttribute('value');
    }).then( (value)=> {
      assert.equal(value, 'this is a title');
    });

    task.sendKeys('this is a task').then( ()=>{
      return task.getAttribute('value');
    }).then( (value)=>{
      assert.equal(value, 'this is a task');
    });
  });

  test.it('should be able to save a task', ()=>{
    const title = driver.findElement({name: 'title'});
    const task = driver.findElement({name: 'task'});
    const save = driver.findElement({name: 'save-button'});

    title.sendKeys('title');
    task.sendKeys('task');
    save.click().then(()=>{
      const cardTitle = driver.findElement({className: 'td-title'});
      return cardTitle.getText();
    }).then((text)=>{
      assert.equal(text, 'title');
    }).then(()=>{
      const cardTask = driver.findElement({className: 'td-task'});
      return cardTask.getText();
    }).then((text)=>{
      assert.equal(text, 'task');
    });
  });

  test.it('should be able to save and delete a task', ()=>{
    const title = driver.findElement({name: 'title'});
    const task = driver.findElement({name: 'task'});
    const save = driver.findElement({name: 'save-button'});

    title.sendKeys('title');
    task.sendKeys('task');
    save.click().then(()=>{
      const cardTitle = driver.findElement({className: 'td-title'});
      return cardTitle.getText();
    }).then((text)=>{
      assert.equal(text, 'title');
    }).then(()=>{
      const cardTask = driver.findElement({className: 'td-task'});
      return cardTask.getText();
    }).then((text)=>{
      assert.equal(text, 'task');
    });
    const deleteButton = driver.findElement({className: 'delete-button'});
    deleteButton.click().then((button)=>{
      assert.equal(button, undefined);
    });
  });

  test.it('should be able to increase importance', ()=>{
    const title = driver.findElement({name: 'title'});
    const task = driver.findElement({name: 'task'});
    const save = driver.findElement({name: 'save-button'});

    title.sendKeys('title');
    task.sendKeys('task');
    save.click().then(()=>{
      const upVoteButton = driver.findElement({className: 'up-button'});
      const importance = driver.findElement({className: 'importance-rating'});
      upVoteButton.click();
      return importance.getText();
    }).then((text)=>{
      assert.equal(text, '2) High');
    });
  });
});
