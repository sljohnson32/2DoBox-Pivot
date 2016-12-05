/*jshint esversion: 6 */
const assert = require('chai').assert;
var tdUpdates = require('../lib/td-updates');

describe('TD update functionality', function() {
  context('with default attributes', function() {

    xit('should be a function', function() {
      assert.isFunction(TD);
    });

    xit('should have an id property', function() {
      assert.equal(td.id, 100);
    });

    xit('should have a title property', function() {
      assert.equal(td.title, 'Test Title');
    });

    xit('should have a task property', function() {
      assert.equal(td.task, 'Test Task');
    });

    xit('should have a completed property set to false as default', function() {
      assert.equal(td.completed, false);
    });

    xit('should have an importance property set to normal as default', function() {
      assert.equal(td.importance, '3) Normal');
    });
  });

  context('with updated importance property', function() {
  
    xit('should have an importance property set to 1) Critical when passed in as an argument', function() {
      assert.equal(td.importance, '1) Critical');
    });
  });
});
