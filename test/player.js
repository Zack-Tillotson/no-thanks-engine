var assert = require('assert');
var Engine = require('../dist/lib.js');
var utils = require('./utils.js');

var Players = Engine.__debug__.Players;

describe('Player', function() {
  describe('noThanksCard', function () {
    it('should take money from the current player and not give them a card', function() {
      var state = Engine.getInitialState(utils.getPlayerList());
      var currentPlayer = state.players.currentPlayer;
      var money = state.players.list[currentPlayer].money;

      var players = Players.noThanksCard(state.players);
      assert.equal(players.currentPlayer, (currentPlayer + 1) % players.list.length);
      assert.equal(players.list[currentPlayer].cards.length, 0);
      assert.equal(players.list[currentPlayer].money, money - 1);
    });
  });
  describe('takeCard', function () {
    it('should give them the money from the pot and give them a card', function() {

      var card = 17;
      var pot = 3;

      var state = Engine.getInitialState(utils.getPlayerList());
      var currentPlayer = state.players.currentPlayer;
      var money = state.players.list[currentPlayer].money;

      var players = Players.takeCard(state.players, card, pot);

      assert.equal(players.currentPlayer, currentPlayer, 'current player changed');
      assert.equal(players.list[currentPlayer].cards.length, 1, 'card length not 1');
      assert.equal(players.list[currentPlayer].cards[0], card, 'first card not ' + card);
      assert.equal(players.list[currentPlayer].money, money + pot);
      assert.equal(-1 * players.list[currentPlayer].money + card, players.list[currentPlayer].score);
    });
    it('should have the player with a list of cards if they take several', function() {

      var state = Engine.getInitialState(utils.getPlayerList());
      var currentPlayer = state.players.currentPlayer;
      var money = state.players.list[currentPlayer].money;

      var players = Players.takeCard(state.players, 17, 3);
      players = Players.takeCard(players, 20, 0);

      assert.equal(players.currentPlayer, currentPlayer, 'current player changed');
      assert.equal(players.list[currentPlayer].cards.length, 2, 'card length not 1');
      assert.equal(37 - 3 - 11, players.list[currentPlayer].score);
    });
  });
  describe('the score roll up', function () {
    it('should correctly not include the higher valued sequential cards', function() {

      const cards = [5,6,12,13,20];
      const score = 5+12+20;
      
      assert.equal(Players.__debug__.getCardValue(cards), score);
      
    });
  });
});