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
  },
  ipAddress: '',
  torAddress: '',
})

// Functions to update the state directly
export const mutations = {
  isOperational(state, operational) {
    state.operational = operational;
  },

  ipAddress(state, address) {
    state.ipAddress = address;
  },

  torAddress(state, address) {
    state.torAddress = address;
  },
};

// Functions to get data from the API
export const actions = {
  async getStatus({ commit }) {
    const status = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/status`);

    if(status) {
      commit('isOperational', status.operational);
    }
  },

  async getAddresses({ commit, state }) {
    // We can only make this request when bitcoind is operational
    if(state.operational) {
      const addresses = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/addresses`);

      if(addresses) {
        addresses.forEach(address => {
          if(address.includes('.onion')) {
            commit('torAddress', address);
          } else {
            commit('ipAddress', address);
          }
        });
      }
    }
  },
};

export const getters = {
  status(state) {
    const data = {
      class: 'loading',
      text: 'Loading...',
    };

    if(state.operational) {
      data.class = 'active';
      data.text = 'Operational';
    }

    return data;
  },
};
