/*jshint esversion: 6 */
const assert = require('chai').assert;
const tdUtilities = require('../lib/td-utilities');

describe('TD utilities functionality', function() {
  context('check buttons', function() {

    it('should be a function', function() {
      let value = tdUtilities.checkButtons;
      assert.isFunction(value);
    });

    // it('should have an id', function() {
    //   let obj = {id: 100};
    //   let value = tdUtilities.checkButtons(obj);
    //   assert.equal(id, 100);
    // });
  });

  context('clearFields', function() {

    it('should be a function', function() {
      let value = tdUtilities.clearFields;
      assert.isFunction(tdUtilities.clearFields);
    });
  });

  context('getTDCount', function() {

    it('should be a function', function() {
      let value = tdUtilities.getTDCount;
      assert.isFunction(tdUtilities.getTDCount);
    });

    it('should return tdCount', function() {
      tdUtilities.getTDCount();
      assert.equal(tdUtilities.getTDCount(), 100);
    });
  });

  // context('incrementTDCount', function() {
  //
  //   it('should be a function', function() {
  //     let value = tdUtilities.getTDCount;
  //     assert.isFunction(tdUtilities.getTDCount);
  //   });
  //
  //   it('should return tdCount', function() {
  //     tdUtilities.getTDCount();
  //     assert.equal(tdUtilities.getTDCount(), 100);
  //   });
  // });
});
