/*jshint esversion: 6 */
const assert    = require('assert');
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');

describe('new functionality bundle', function () {
  it('should work', function () {
    assert(true);
  });
});

test.describe('testing ideabox', function() {
  this.timeout(10000);
  test.it('should allow me to add a title and a task', ()=>{
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    driver.get('http://localhost:8080');

    const title = driver.findElement({name: 'title'});
    const task = driver.findElement({name: 'task'});

    title.sendKeys('this is a title').then(()=>{
      return title.getAttribute('value');
    }).then((value)=>{
      assert.equal(value, 'this is a title');
    });

    task.sendKeys('this is a task').then(()=>{
      return task.getAttribute('value');
    }).then((value)=>{
      assert.equal(value, 'this is a task');
    });

    driver.quit();
  });

  test.it('should allow me to submit a title and a task', ()=>{
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    driver.get('http://localhost:8080');

    const title = driver.findElement({name: 'title'});
    const task = driver.findElement({name: 'task'});
    const save = driver.findElement({name: 'button'});

    title.sendKeys('this is a title');
    task.sendKeys('this is a task');
    save.click();

    // driver.findElement({className: ‘delete-idea’}).click()
    // assert.equal(className: 'td-title', 'this is a title');

    // title.sendKeys('this is a title').then( function() {
    //   return title.getAttribute('value');
    // }).then(function(value){
    //   assert.equal(value, 'this is a title');
    // });
    //
    // task.sendKeys('this is a task').then( function() {
    //   return task.getAttribute('value');
    // }).then(function(value){
    //   assert.equal(value, 'this is a task');
    // });

    driver.quit();
  });

  // test.it('can add multiple ideas', ()=>{
  //   this.timeout(10000);
  //   const driver = new webdriver.Builder()
  //   .forBrowser('chrome')
  //   .build();
  //
  //   driver.get('http://localhost:8080');
  //
  //   const title = driver.findElement({name:'title'});
  //   title.sendKeys('this is a title');
  //
  //   const task = driver.findElement({name:'task'});
  //   task.sendKeys('this is a task');
  //
  //   const submit = driver.findElement({name: 'button'});
  //   submit.click();
  //
  //   title.sendKeys('this is a title 2');
  //
  //   task.sendKeys('this is a task 2');
  //
  //   submit.click();
  //
  //   var allIdeas = driver.findElements({tagName: 'article'});
  //   driver.findElements({tagName:'article'}).then((article) =>{
  //     assert.equal(article.length, 2);
  //   });
  //
  //
  //   driver.findElements({tagName: 'article'}).then((article)=>{
  //     assert.equal(article.length, 1);
  //   });
  //   driver.quit();
  // });
});
