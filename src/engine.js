// Engine
// Should implement pure functions: getInitialState, getActionOptions
import Deck from './deck';
import Players from './players';
import Table from './table';

const Actions = {
  NoThanks: 'noThanks',
  Take: 'take'
};

function getInitialState(playerList) {

  const deck = Deck.resetDeck();
  const players = Players.resetPlayers(playerList);
  const table = Table.resetTable();
  const game = getGameState(deck);
  
  return {deck, players, table, game};

}

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

function resolveAction(state, action) {

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

}

const Engine = {getLegalActions, resolveAction};

export default {
  getInitialState, 
  getLegalActions,
  __debug__: {Engine, Deck, Players, Table}
}