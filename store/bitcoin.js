import API from '@/helpers/api';

// Initial state
export const state = () => ({
  operational: false,
  calibrating: false,
  currentBlock: 0,
  blockHeight: 0,
  percent: 0,
  peers: {
    total: 0,
    inbound: 0,
    outbound: 0,
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

  syncStatus(state, sync) {
    state.percent = parseFloat(sync.percent) * 100;
    state.currentBlock = sync.currentBlock;
    state.blockHeight = sync.headerCount;

    if(sync.status === 'calibrating') {
      state.calibrating = true;
    } else {
      state.calibrating = false;
    }
  },

  peers(state, peers) {
    state.peers.total = peers.total || 0;
    state.peers.inbound = peers.inbound || 0;
    state.peers.outbound = peers.outbound || 0;
  },
};

// Functions to get data from the API
export const actions = {
  async getStatus({ commit, dispatch }) {
    const status = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/status`);

    if(status) {
      commit('isOperational', status.operational);

      if(status.operational) {
        dispatch('getSync');
      }
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

  async getSync({ commit, state }) {
    if(state.operational) {
      const sync = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/sync`);

      if(sync) {
        commit('syncStatus', sync);
      }
    }
  },

  async getPeers({ commit, state }) {
    if(state.operational) {
      const peers = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/connections`);

      if(peers) {
        commit('peers', peers);
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
