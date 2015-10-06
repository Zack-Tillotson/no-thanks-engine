// Engine
// Should implement pure functions: getInitialState, resolveAction
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

function getLegalActions(state) {
  const ret = [Actions.Take];
  if(state.players.list[state.players.currentPlayer].money > 0) {
    ret.push(Actions.NoThanks);
  }
  return ret;
}

export default {
  getInitialState(playerList) {

    const deck = Deck.resetDeck();
    const players = Players.resetPlayers(playerList);
    const table = Table.resetTable();
    const game = getGameState(deck);
    
    return {deck, players, table, game};

  },

  getLegalActions,

  resolveAction(state, action) {

    if(getLegalActions(state).indexOf(action) === -1) {
      throw "Attempted to take illegal action '" + action 
        + "', legal actions are " + getLegalActions(state).toString();
    }

    const card = state.deck[0];
    const pot = state.table.pot;

    const players = (action === Actions.NoThanks)
      ? Players.noThanksCard(state.players)
      : Players.takeCard(state.players, card, pot);

    const deck = (action === Actions.NoThanks) ? state.deck : Deck.drawCard(state.deck);

    const table = (action === Actions.NoThanks) 
      ? Table.bumpPot(state.table) 
      : Table.takePot(state.table);

    const game = getGameState(deck);


    return {deck, players, table, game};
 
  },
  __debug__: {Deck, Players, Table}
}