import API from '@/helpers/api';

// Initial state
export const state = () => ({
  bitcoindVersion: false,
  lndVersion: false,
  updateAvailable: false,
  invalidDigest: false,
  updatingBuildArtifacts: false,
  onionAddress: '',
  localHostAddress: '',
  units: 'sats'
});

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

  setInvalidDigest(state, invalidDigest) {
    state.invalidDigest = invalidDigest;
  },

  setUpdating(state, updatingBuildArtifacts) {
    state.updatingBuildArtifacts = updatingBuildArtifacts;
  },

  setOnionAddress(state, address) {
    state.onionAddress = address;
  },

  setLocalHostAddress(state, address) {
    state.localHostAddress = address;
  },

  setUnits(state, denomination) {
    state.units = denomination;
  },

};

// Functions to get data from the API
export const actions = {
  async getAddresses({ commit }) {
    const addresses = await API.get(
      this.$axios,
      `${this.$env.API_MANAGER}/v1/telemetry/addresses`
    );

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

    commit('setInvalidDigest', versions.invalidDigestDetected);
    commit('setUpdating', versions.updatingBuildArtifacts);

    let updateAvailable = false;

    Object.keys(versions.applications).forEach(function(key) {

      if (versions.applications[key].newVersionsAvailable
        && versions.applications[key].newVersionsAvailable.length) {

        updateAvailable = true;
      }
    });

    commit('setUpdate', updateAvailable);
  },

  async setUnits({ commit }, payload) {
    commit('setUnits', payload);
  }
};

export const getters = {
  getUnits: state => {
    return state.units;
  }
};
