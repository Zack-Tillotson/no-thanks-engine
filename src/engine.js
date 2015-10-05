// Engine
// Should implement pure functions: getInitialState, resolveActions
import Deck from './deck';
import Players from './player';
import Table from './table';

export default {
  getInitialState(playerList) {

    const deck = Deck.resetDeck();
    const players = Players.resetPlayers(playerList)
    const table = Table.resetTable();

    return {deck, players, table};

  },

  resolveActions(state, action) {

    const card = state.deck.topCard;
    const pot = state.table.pot;

    const players = (ation === Actions.NoThanks)
      ? Players.noThanksCard(state.players)
      : Players.takeCard(state.players, card, pot);

    const deck = (action === Actions.NoThanks) ? state.deck : Deck.drawCard(state.deck);

    const table = (action === Actions.NoThanks) 
      ? Table.dumpPot(state.table) 
      : Table.resetPot(state.table);


    return {deck, players, table};
 
  }
}