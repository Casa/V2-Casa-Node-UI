import API from '@/helpers/api';

// Initial state
export const state = () => ({
  bitcoindVersion: false,
  lndVersion: false,
  updateAvailable: false,
})

// Functions to update the state directly
export const mutations = {
  setBitcoindVersion(state, version) {
    state.bitcoindVersion = version;
  },

  setLndVersion(state, version) {
    state.lndVersion = version;
  },

  setUpdate(state, updates) {
    state.updateAvailable = updates;
  }
}

// Functions to get data from the API
export const actions = {
  async getStatus({ commit }) {
    const bitcoind = await API.get(this.$axios, `${this.$env.API_LND}/v1/bitcoind/info/version`);
    const lnd = await API.get(this.$axios, `${this.$env.API_LND}/v1/lnd/info/version`);

    if(bitcoind) {
      commit('setBitcoindVersion', bitcoind.version);
    }

    if(lnd) {
      commit('setLndVersion', lnd.version);
    }
  },

  async checkForUpdates({ commit }) {
    const versions = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/telemetry/version`);
    const containers = Object.entries(versions.applications);
    let updateAvailable = false;

    containers.forEach(([container, version]) => {
      console.log(container, version);

      if(version.newVersionsAvailable.length) {
        updateAvailable = true;
      }
    });

    commit('setUpdate', updateAvailable);
  },
}
