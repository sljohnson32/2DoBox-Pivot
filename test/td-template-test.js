/*jshint esversion: 6 */
const assert = require('chai').assert;
const $ = require('jquery');
const template = require('../lib/td-template');

describe('TD template functionality', function() {
  context('tdHTML function', function() {

    it('should be a function', function() {
      assert.isFunction(template.tdHTML);
    });

  });


  context('tdCreator function', function() {
    let value = template.tdCreator;

    it('should be a function', function() {
      assert.isFunction(value);
    });

  });

});
