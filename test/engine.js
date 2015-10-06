var assert = require('assert');
var Engine = require('../dist/lib.js');
var utils = require('./utils.js');

describe('Engine', function() {
  describe('getInitialState()\'s deck', function () {
    it('should initially have 23 cards in it', function () {
      var deck = Engine.getInitialState(utils.getPlayerList()).deck;
      assert.equal(deck.length, 24);
    });
    it('should not have duplicates', function () {
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
});