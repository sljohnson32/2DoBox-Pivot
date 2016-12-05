/*jshint esversion: 6 */
const assert = require('chai').assert;
let tdUpdates = require('../lib/td-updates');

describe('TD update functionality', function() {
  context('up vote updates', function() {

    it('should be a function', function() {
      let value = tdUpdates.upVoteChange;
      assert.isFunction(value);
    });

    it('should update importance from 5 to 4', function() {
      let value = tdUpdates.upVoteChange('5) None');
      assert.equal(value, '4) Low');
    });

    it('should update importance from 4 to 3', function() {
      let value = tdUpdates.upVoteChange('4) Low');
      assert.equal(value, '3) Normal');
    });

    it('should update importance from 3 to 2', function() {
      let value = tdUpdates.upVoteChange('3) Normal');
      assert.equal(value, '2) High');
    });

    it('should update importance from 2 to 1', function() {
      let value = tdUpdates.upVoteChange('2) High');
      assert.equal(value, '1) Critical');
    });
  });

  context('down vote updates', function() {

    it('should be a function', function() {
      assert.isFunction(tdUpdates.downVoteChange);
    });

    it('should update importance from 1 to 2', function() {
      let value = tdUpdates.downVoteChange('1) Critical');
      assert.equal(value, '2) High');
    });

    it('should update importance from 2 to 3', function() {
      let value = tdUpdates.downVoteChange('2) High');
      assert.equal(value, '3) Normal');
    });

    it('should update importance from 3 to 4', function() {
      let value = tdUpdates.downVoteChange('3) Normal');
      assert.equal(value, '4) Low');
    });

    it('should update importance from 4 to 5', function() {
      let value = tdUpdates.downVoteChange('4) Low');
      assert.equal(value, '5) None');
    });

    it('should update importance from 1 to 2', function() {
      let value = tdUpdates.downVoteChange('1) Critical');
      assert.equal(value, '2) High');
    });
  });
});
