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
  connectionCode: 'unknown',
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
  },

  setConnectionCode(state, code) {
    state.connectionCode = code;
  },

  setChannels(state, channels) {
    state.channels = channels;
  },

  setPendingBalance(state, pendingBalance) {
    state.balance.pending = pendingBalance;
  },

  setMaxReceive(state, maxReceive) {
    state.maxReceive = maxReceive;
  },

  setMaxSend(state, maxSend) {
    state.maxSend = maxSend;
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
  },

  async getConnectionCode({ commit }) {
    const uris = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/info/uris`);

    if(uris && uris.length > 0) {
      commit('setConnectionCode', uris[0]);
    } else {
      commit('setConnectionCode', 'Could not determine lnd connection code');
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
