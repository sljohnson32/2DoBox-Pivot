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
  test.it('should allow me to add a title and a description', ()=>{
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    driver.get('http://localhost:8080');

    const title = driver.findElement({name: 'title'});
    const description = driver.findElement({name: 'description'});
    title.sendKeys('this is a title').then(()=>{
      return title.getAttribute('value');
    }).then((value)=>{
      assert.equal(value, 'this is a title');
    });

    description.sendKeys('this is a description').then(()=>{
      return description.getAttribute('value');
    }).then((value)=>{
      assert.equal(value, 'this is a description');
    });

    driver.quit();
  });
});
