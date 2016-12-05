/*jshint esversion: 6 */
const assert = require('chai').assert;
let TD = require('../lib/new-td');

describe('New td object', function() {
  context('with default attributes', function() {
    let td = new TD(100, 'Test Title', 'Test Task');

    it('should be a function', function() {
      assert.isFunction(TD);
    });

    it('should have an id property', function() {
      assert.equal(td.id, 100);
    });

    it('should have a title property', function() {
      assert.equal(td.title, 'Test Title');
    });

    it('should have a task property', function() {
      assert.equal(td.task, 'Test Task');
    });

    it('should have a completed property set to false as default', function() {
      assert.equal(td.completed, false);
    });

    it('should have an importance property set to normal as default', function() {
      assert.equal(td.importance, '3) Normal');
    });
  });

  context('with updated importance property', function() {

    it('should have an importance property set to 1) Critical when passed in as an argument', function() {
      let td = new TD(100, 'Test Title', 'Test Task', '1) Critical');
      assert.equal(td.importance, '1) Critical');
    });

    it('should have an importance property set to 2) High when passed in as an argument', function() {
      let td = new TD(100, 'Test Title', 'Test Task', '2) High');
      assert.equal(td.importance, '2) High');
    });

    it('should have an importance property set to 3) Normal when passed in as an argument', function() {
      let td = new TD(100, 'Test Title', 'Test Task', '3) Normal');
      assert.equal(td.importance, '3) Normal');
    });

    it('should have an importance property set to 4) Low when passed in as an argument', function() {
      let td = new TD(100, 'Test Title', 'Test Task', '4) Low');
      assert.equal(td.importance, '4) Low');
    });

    it('should have an importance property set to 5) None when passed in as an argument', function() {
      let td = new TD(100, 'Test Title', 'Test Task', '5) None');
      assert.equal(td.importance, '5) None');
    });

  });
});
