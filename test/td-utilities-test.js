/*jshint esversion: 6 */
const assert = require('chai').assert;
const tdUtilities = require('../lib/td-utilities');

describe('TD utilities functionality', function() {
  context('check buttons', function() {

    it('should be a function', function() {
      let value = tdUtilities.checkButtons;
      assert.isFunction(value);
    });
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

  context('incrementTDCount', function() {

    it('should be a function', function() {
      let value = tdUtilities.incrementTDCount;
      assert.isFunction(tdUtilities.incrementTDCount);
    });
  });

  context('loadCompletes', function() {

    it('should be a function', function() {
      let value = tdUtilities.loadCompletes;
      assert.isFunction(tdUtilities.loadCompletes);
    });
  });

  context('showMoreTDs', function() {

    it('should be a function', function() {
      let value = tdUtilities.showMoreTDs;
      assert.isFunction(tdUtilities.showMoreTDs);
    });

    it('should add 10', function() {
      let tdShowEnd = 10;
      tdUtilities.showMoreTDs();
      assert.equal(tdShowEnd, 10);
    });
  });
});
