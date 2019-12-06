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
  pubkey: '',
})

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
    if(balance.confirmed !== undefined) {
      state.balance.confirmed = parseInt(balance.confirmed);
    }

    if(balance.pending !== undefined) {
      state.balance.pending = parseInt(balance.pending);
    }

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
  },

  setPubKey(state, pubkey) {
    state.pubkey = pubkey;
  },
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

  async getLndPageData({ commit }) {
    const lightning = await API.get(this.$axios, `${this.$env.API_LND}/v1/pages/lnd`);

    if(lightning) {
      const lightningInfo = lightning.lightningInfo;

      commit('setPubKey', lightningInfo.identityPubkey);
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

  // Deprecated, this endpoint returns balance data minus estimated channel closing fees
  // These estimates have caused many customers to be confused by the numbers displayed in the dashboard (leaky sats)
  // Instead we can calculate our total balance by getting the sum of each channel's localBalance
  async getBalance({ commit, state }) {
    if(state.operational && state.unlocked) {
      const balance = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/wallet/lightning`);

      if(balance) {
        commit('setBalance', {confirmed: balance.balance});
      }
    }
  },

  async getChannels({ commit, state }) {
    if(state.operational && state.unlocked) {
      const rawChannels = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/channel`);
      const channels = [];
      let confirmedBalance = 0;
      let pendingBalance = 0;
      let maxReceive = 0;
      let maxSend = 0;

      if(rawChannels) {
        // Loop through channels to determine pending balance, max payment amount, and sort channels by type
        rawChannels.forEach((channel) => {
          const localBalance = parseInt(channel.localBalance) || 0;
          const remoteBalance = parseInt(channel.remoteBalance) || 0;

          if(channel.type === 'OPEN') {
            if(channel.active) {
              channel.status = 'online';
            } else {
              channel.status = 'offline';
            }

            if(remoteBalance > maxReceive) {
              maxReceive = remoteBalance;
            }

            if(localBalance > maxSend) {
              maxSend = localBalance;
            }

            confirmedBalance += localBalance;
          } else if(channel.type === 'PENDING_OPEN_CHANNEL') {
            pendingBalance += localBalance;
            channel.status = 'opening';
          } else if (['WAITING_CLOSING_CHANNEL', 'FORCE_CLOSING_CHANNEL', 'PENDING_CLOSING_CHANNEL'].indexOf(channel.type) > -1) {
            pendingBalance += localBalance;
            channel.status = 'closing';
          } else {
            channel.status = 'unknown';
          }

          channels.push(channel);
        });

        commit('setChannels', channels);
        commit('setBalance', {confirmed: confirmedBalance, pending: pendingBalance});
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
