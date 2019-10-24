import API from '@/helpers/api';

// Initial state
export const state = () => ({
  operational: false,
  unlocked: false,
})

// Functions to update the state directly
export const mutations = {
  isOperational(state, operational) {
    state.operational = operational;
  },

  isUnlocked(state, unlocked) {
    state.unlocked = unlocked;
  }
}

// Functions to get data from the API
export const actions = {
  async getStatus({ commit }) {
    const status = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/info/status`);

    if(status) {
      commit('isOperational', status.operational);
      commit('isUnlocked', status.unlocked);
    }
  }
}
