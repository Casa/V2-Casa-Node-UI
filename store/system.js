import API from '@/helpers/api';

// Initial state
export const state = () => ({
  bitcoindVersion: false,
  lndVersion: false,
  updateAvailable: false,
  onionAddress: '',
  localHostAddress: '',
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
  },

  setOnionAddress(state, address) {
    state.onionAddress = address
  },

  setLocalHostAddress(state, address) {
    state.localHostAddress = address;
  },

}

// Functions to get data from the API
export const actions = {

  async getAddresses({ commit }) {
    const addresses = await API.get(this.$axios, `${this.$env.API_MANAGER}/v1/telemetry/addresses`);

    if(addresses) {

      for (const address of addresses) {
        if (address.includes('onion')) {
          commit('setOnionAddress', address);
        } else {
          commit('setLocalHostAddress', address);
        }
      }
    }
  },

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
