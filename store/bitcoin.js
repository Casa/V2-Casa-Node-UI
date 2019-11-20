import API from '@/helpers/api';

// Initial state
export const state = () => ({
  operational: false,
  calibrating: false,
  ipAddress: '',
  torAddress: '',
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
    pending: 6,
    pendingIn: 3,
    pendingOut: 3,
  },
  transactions: [],
  pending: [],
  price: 0,
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
    state.percent = (parseFloat(sync.percent) * 100).toFixed(2);
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

  balance(state, balance) {
    console.log(balance);
    state.wallet = balance;
  },

  transactions(state, transactions) {
    // Clear previously loaded data
    state.transactions = [];
    state.pending = [];

    // Loop through transactions and sort them by type
    transactions.forEach((transaction) => {
      // Only display Bitcoin transactions
      if(transaction.type === 'ON_CHAIN_TRANSACTION_SENT' || transaction.type === 'ON_CHAIN_TRANSACTION_RECEIVED') {
        if(transaction.numConfirmations > 0) {
          state.transactions.push(transaction);
        } else {
          state.pending.push(transaction);
        }
      }
    });
  },

  price(state, usd) {
    state.price = usd;
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

  async getBalance({ commit, state }) {
    if(state.operational) {
      const balance = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/wallet/btc`);

      if(balance) {
        commit('balance', balance);
      }
    }
  },

  async getTransactions({ commit, state }) {
    if(state.operational) {
      const transactions = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/transaction`);

      if(transactions) {
        commit('transactions', transactions);
      }
    }
  },

  async getPrice({ commit }) {
    // Todo: Cache this value on the node instead of making a 3rd party request
    const price = await API.get(this.$axios, 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD');

    if(price) {
      commit('price', price.usd);
    }
  }
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
