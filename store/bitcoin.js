import API from '@/helpers/api';

// Initial state
export const state = () => ({
  operational: false,
  currentBlock: 0,
  blockHeight: 0,
  peers: {
    total: 4,
    inbound: 2,
    outbound: 2,
  },
  balance: {
    total: 1337,
    confirmed: 1337,
    pending: 3,
  }
})

// Functions to update the state directly
export const mutations = {
  isOperational(state, operational) {
    state.operational = operational;
  }
}

// Functions to get data from the API
export const actions = {
  async getStatus({ commit }) {
    const status = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/status`);

    if(status) {
      commit('isOperational', status.operational);
    }
  },
}
