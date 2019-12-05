import API from '@/helpers/api';

// Helper function to sort lightning transactions by date
function sortTransactions(a, b) {
  if (a.creationDate > b.creationDate) {
    return -1;
  }

  if (a.creationDate < b.creationDate) {
    return 1;
  }

  return 0;
}

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
  connectionCode: 'unknown',
  maxSend: 0,
  maxReceive: 0,
  confirmedTransactions: [],
  pendingTransactions: [],
});

// Functions to update the state directly
export const mutations = {
  isOperational(state, operational) {
    state.operational = operational;
  },

  isUnlocked(state, unlocked) {
    state.unlocked = unlocked;
  },

  setConnectionCode(state, code) {
    state.connectionCode = code;
  },

  setChannels(state, channels) {
    state.channels = channels;
  },

  setBalance(state, balance) {
    state.balance.confirmed = parseInt(balance);
    state.balance.total = state.balance.confirmed + state.balance.pending;
  },

  setPendingBalance(state, pendingBalance) {
    state.balance.pending = parseInt(pendingBalance);
    state.balance.total = state.balance.confirmed + state.balance.pending;
  },

  setMaxReceive(state, maxReceive) {
    state.maxReceive = maxReceive;
  },

  setMaxSend(state, maxSend) {
    state.maxSend = maxSend;
  },

  setConfirmedTransactions(state, confirmedTransactions) {
    state.confirmedTransactions = confirmedTransactions;
  },

  setPendingTransactions(state, pendingTransactions) {
    state.pendingTransactions = pendingTransactions;
  }
};

// Functions to get data from the API
export const actions = {
  async getStatus({ commit }) {
    const status = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/info/status`);

    if(status) {
      commit('isOperational', status.operational);
      commit('isUnlocked', status.unlocked);
    }
  },

  async getConnectionCode({ commit }) {
    const uris = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/info/uris`);

    if(uris && uris.length > 0) {
      commit('setConnectionCode', uris[0]);
    } else {
      commit('setConnectionCode', 'Could not determine lnd connection code');
    }
  },

  async getBalance({ commit, state }) {
    if(state.operational && state.unlocked) {
      const balance = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/wallet/lightning`);

      if(balance) {
        commit('setBalance', balance.balance);
      }
    }
  },

  async getChannels({ commit, state }) {
    if(state.operational && state.unlocked) {
      const rawChannels = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/channel`);
      const channels = [];
      let pending = 0;
      let maxReceive = 0;
      let maxSend = 0;

      if(rawChannels) {
        // Loop through channels to determine pending balance, max payment amount, and sort channels by type
        rawChannels.forEach((channel) => {
          const localBalance = parseInt(channel.localBalance) || 0;
          const remoteBalance = parseInt(channel.remoteBalance) || 0;

          if(channel.type === 'OPEN') {
            channel.status = 'open';

            if(remoteBalance > maxReceive) {
              maxReceive = remoteBalance;
            }

            if(localBalance > maxSend) {
              maxSend = localBalance;
            }
          } else if (['WAITING_CLOSING_CHANNEL', 'FORCE_CLOSING_CHANNEL', 'PENDING_CLOSING_CHANNEL', 'PENDING_OPEN_CHANNEL'].indexOf(channel.type) > -1) {
            pending += localBalance;
            channel.status = 'pending';
          } else {
            channel.status = 'unknown';
          }

          channels.push(channel);
        });

        commit('setChannels', channels);
        commit('setPendingBalance', pending);
        commit('setMaxReceive', maxReceive);
        commit('setMaxSend', maxSend);
      }
    }
  },

  async getTransactions({ commit, state }) {
    if(state.operational && state.unlocked) {
      // Get invoices and payments
      const invoices = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/lightning/invoices`);
      const payments = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/lightning/payments`);

      // Loop through invoices and payments to determine which are pending and completed
      if(invoices && payments) {
        const transactions = [];
        const pending = [];

        invoices.forEach((invoice) => {
          if(invoice.settled) {
            transactions.push(invoice);
          } else {
            // If this invoice hasn't expired
            if(parseInt(invoice.creationDate) + parseInt(invoice.expiry) > new Date().getTime() / 1000) {
              pending.push(invoice);
            }
          }
        });

        payments.forEach((payment) => {
          // Payments should be negative to match the display of BTC transactions
          payment.value *= -1;
          transactions.push(payment);
        });

        // Sort the transactions by date now that invoices and payments been combined
        transactions.sort(sortTransactions);

        commit('setConfirmedTransactions', transactions);
        commit('setPendingTransactions', pending);
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
