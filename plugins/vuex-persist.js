// ~/plugins/vuex-persist.js
import VuexPersist from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersist({
      key: 'vuex',
      storage: window.localStorage
    }).plugin(store);
  });
};
