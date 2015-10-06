var assert = require('assert');
var Engine = require('../dist/lib.js');
var utils = require('./utils.js');

var Deck = Engine.__debug__.Deck;

describe('Deck', function() {
  it('should lose the top card after each draw', function () {
    var deck = [1,2,3,4,5];
    var length = 5
    var nextTopCard = 2;
    deck = Deck.drawCard(deck);
    assert.equal(length, deck.length + 1);
    assert.equal(nextTopCard, deck[0]);
  });
  it('should not be able to draw past the last card', function () {
    var deck = [1,2,3,4,5];
    var cardsDrawn = 0;
    while(deck.length) {
      deck = Deck.drawCard(deck);
      cardsDrawn++;
    }
    assert.equal(cardsDrawn, 5);
    assert.equal(deck.length, 0);

    deck = Deck.drawCard(deck);
    assert.equal(deck.length, 0);
  });
});