
export default {
  resetTable() {
    return {pot: 0};
  },
  takePot(state) {
    return {...state, pot: 0};
  },
  bumpPot(state) {
    return {...state, pot: (state.pot + 1)};
  }
}