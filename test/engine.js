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


    it('should have game.ongoing be true until the deck is empty', function() {
      var gameState = Engine.getInitialState(utils.getPlayerList());

      var initialDeckSize = gameState.deck.length;
      var drawnCards = 0;
      while(gameState.game.ongoing && drawnCards < 9999) {
        gameState = Engine.resolveAction(gameState, 'take');
        drawnCards++;
      }
      
      assert.equal(initialDeckSize, drawnCards);
      assert(!gameState.game.ongoing);
      
    });

  });

  describe('resolveAction()', function() {
    it('should be callable with a take action', function() {
      var state = Engine.getInitialState(utils.getPlayerList());
      state = Engine.__debug__.Engine.resolveAction(state, 'take');
      assert(!Number.isNaN(state.players.list[0].score)); // Breaks on NaN
      assert(!Number.isNaN(state.players.list[1].score));
    });
    it('should be callable with a no thanks action', function() {
      var state = Engine.getInitialState(utils.getPlayerList());
      state = Engine.__debug__.Engine.resolveAction(state, 'noThanks');
    });
  });

  describe('getLegalActions()', function() {

    it('should return both actions at the beginning of a game', function() {
      var state = Engine.getInitialState(utils.getPlayerList());
      const actions = Engine.__debug__.Engine.getLegalActions(state);
      assert.equal(actions.length, 2);
      assert(actions[0] === 'noThanks' || actions[1] === 'noThanks');
      assert(actions[0] === 'take' || actions[1] === 'take');
    });

    it('should only return take when the current player is out of money', function() {
      var state = Engine.getInitialState(utils.getPlayerList());
      state.players.list[state.players.currentPlayer].money = 0;
      const actions = Engine.__debug__.Engine.getLegalActions(state);
      assert.equal(actions.length, 1);
      assert(actions[0] === 'take');
    });

  });

});