
const STARTING_PLAYER_MONEY = 11;

function resetPlayerList(playerList) {
  return playerList
    .map((player) => {
      const money = STARTING_PLAYER_MONEY;
      const cards = [];
      const score = getCardValue(cards) - money;
      return {...player, money, cards, score};
    })
    .sort((a,b) => Math.random() > .5);
}

function decrementMoney(player) {
  const money = player.money - 1;
  const score = getCardValue(player.cards) - money;
  return {...player, money, score};
}

function getCardValue(cards) {
  return cards
    .slice(0)
    .sort((a,b) => b-a)
    .reduce((sum, card, index) => {
      return index !== 0 && cards[index] === cards[index-1] + 1 ? sum : sum + card;
    }, 0);
}

function addCard(player, card, pot) {
  const cards = player.cards.slice(0);
  cards.push(card);

  const money = player.money + pot;
  const score = getCardValue(cards) - money;

  return {...player, cards, money, score}
}

export default {
  resetPlayers(playerList) {
    return {
      currentPlayer: parseInt(Math.random() * playerList.length),
      list: resetPlayerList(playerList)
    }
  },
  noThanksCard(players) {

    const list = players.list.slice(0);
    const currentPlayer = list[players.currentPlayer];

    const updatedPlayer = decrementMoney(currentPlayer);
    list[players.currentPlayer] = updatedPlayer;

    return {
      currentPlayer: (players.currentPlayer + 1) % list.length,
      list
    }
  },

  takeCard(players, card, pot) {
    const list = players.list.slice(0);
    const currentPlayer = list[players.currentPlayer];

    const updatedPlayer = addCard(currentPlayer, card, pot);
    list[players.currentPlayer] = updatedPlayer;

    return {
      currentPlayer: players.currentPlayer,
      list
    }
  },
  __debug__: {
    getCardValue
  }
}