const MIN_CARD_VALUE = 3;
const MAX_CARD_VALUE = 35;
const NUMBER_OF_CARDS_LEFT_OUT = 9;

function buildDeck() {
  const ret = [];
  for(let i = MIN_CARD_VALUE; i <= MAX_CARD_VALUE; i++) {
    ret.push(i);
  }
  return ret.sort(() => {
    return Math.random() > .5;
  }).slice(NUMBER_OF_CARDS_LEFT_OUT);
}

export default {
  resetDeck() {
    const deck = buildDeck();
    return deck;
  },
  drawCard(deck) {
    deck = deck.slice(0);
    if(deck.length > 0) {
      deck.shift();
    }
    return deck;
  }
}