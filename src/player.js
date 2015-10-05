
const STARTING_PLAYER_MONEY = 11;

function resetPlayerList(playerList) {
  return playerList
    .map((player) => {
      return {...player, money: STARTING_PLAYER_MONEY, cards: []}
    })
    .sort((a,b) => Math.random() > .5);
}

function decrementMoney(player) {
  const money = player.money - 1;
  return {...player, money};
}

function addCard(player, card, pot) {
  const cards = player.cards.slice(0);
  cards.push(card);

  const money = player.money + pot;

  return {...player, cards, money}
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
      currentPlayer: (players.currentPlayer + 1) % player.list,
      list
    }
  },
  takeCard(state, card, pot) {
    const list = players.list.slice(0);
    const currentPlayer = list[players.currentPlayer];

    const updatedPlayer = addCard(currentPlayer, card, pot);
    list[players.currentPlayer] = updatedPlayer;

    return {
      currentPlayer: (players.currentPlayer + 1) % player.list,
      list
    }
  }
}