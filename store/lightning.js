import API from '@/helpers/api';

// Initial state
export const state = () => ({
  operational: false,
  unlocked: false,
  currentBlock: 0,
  blockHeight: 0,
  balance: {
    total: 0,
    confirmed: 0,
    pending: 0,
  },
  channels: [],
  maxSend: 0,
  maxReceive: 0,
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

export const getters = {
  status(state) {
    const data = {
      class: 'loading',
      text: 'Loading...',
    };

    if(state.operational) {
      if(state.unlocked) {
        data.class = 'active';
        data.text = 'Active';
      } else {
        data.class = 'inactive';
        data.text = 'Locked';
      }
    }

    return data;
  },
};
