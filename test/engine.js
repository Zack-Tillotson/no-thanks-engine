var assert = require('assert');
var Engine = require('../dist/lib.js');
var utils = require('./utils.js');

describe('Engine', function() {
  describe('getInitialState()', function () {
    it('the deck should initially have 23 cards in it', function () {
      var deck = Engine.getInitialState(utils.getPlayerList()).deck;
      assert.equal(deck.length, 24);
    });
    it('the deck should not have duplicates', function () {
      var deck = Engine.getInitialState(utils.getPlayerList()).deck;
      var numbers = {};
      var foundDuplicate = false;
      for(var i = 0 ; i < deck.length ; i++) {
        numbers[deck[i]] = numbers[deck[i]] ? numbers[deck[i]] + 1 : 1;
        if(numbers[deck[i]] > 1) {
          foundDuplicate = true;
        }
      }
      assert(!foundDuplicate);
    });
  });
  describe('resolveAction()', function() {
    it('should be callable with a take action', function() {
      var state = Engine.getInitialState(utils.getPlayerList());
      Engine.resolveAction(state, 'take');;
    });
    it('should be callable with a no thanks action', function() {
      var state = Engine.getInitialState(utils.getPlayerList());
      Engine.resolveAction(state, 'noThanks');;
    });
  });
});