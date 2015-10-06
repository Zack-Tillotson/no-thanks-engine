// Engine
// Should implement pure functions: getInitialState, resolveActions
import Deck from './deck';
import Players from './players';
import Table from './table';

const Actions = {
  NoThanks: 'noThanks',
  Take: 'take'
};

function getGameState(deck) {
  return {
    ongoing: deck.length > 0
  };
}

export default {
  getInitialState(playerList) {

    const deck = Deck.resetDeck();
    const players = Players.resetPlayers(playerList)
    const table = Table.resetTable();
    const game = getGameState(deck);

    return {deck, players, table, game};

  },

  resolveAction(state, action) {

    const card = state.deck.topCard;
    const pot = state.table.pot;

    const players = (action === Actions.NoThanks)
      ? Players.noThanksCard(state.players)
      : Players.takeCard(state.players, card, pot);

    const deck = (action === Actions.NoThanks) ? state.deck : Deck.drawCard(state.deck);

    const table = (action === Actions.NoThanks) 
      ? Table.dumpPot(state.table) 
      : Table.resetPot(state.table);

    const game = getGameState(deck);


    return {deck, players, table, game};
 
  },
  __debug__: {Deck, Players, Table}
}