// 3rd party components
import Vue from 'vue';
import VueQriously from 'vue-qriously';
import VTooltip from 'v-tooltip';
import ToggleButton from 'vue-js-toggle-button';
import Toasted from 'vue-toasted';

Vue.use(VueQriously);
Vue.use(VTooltip);
Vue.use(ToggleButton);
Vue.use(Toasted);

// Register Global Notification Toast.
const toastOptions = {
  duration: 5000,
  iconPack: 'callback',
  className: 'casa-toast',
  action: { text: '', onClick: (e, toast) => toast.goAway(0) },
  icon: el => {
    el.innerHTML = '<svg viewBox="0 0 2 2"><circle cx="1" cy="1" r="1" fill="#ffea70"/></svg>';
    return el;
  }
};

// register the toast with the custom message
Vue.toasted.register('default', payload => {
    if (!payload.message) {
      return 'Oops.. Something Went Wrong..';
    }
    return `Notice: ${payload.message}`;
  },
  toastOptions
);

// Custom components
import UnitSwitch from '~/components/global/UnitSwitch';
import Footer from '~/components/global/Footer';
import InputField from '~/components/global/InputField';
import Modal from '~/components/global/Modal';
import ModalClose from '~/components/global/ModalClose';
import CopyField from '~/components/global/CopyField';
import ButtonSpinner from '~/components/global/ButtonSpinner';

Vue.component('UnitSwitch', UnitSwitch);
Vue.component('Footer', Footer);
Vue.component('InputField', InputField);
Vue.component('Modal', Modal);
Vue.component('ModalClose', ModalClose);
Vue.component('CopyField', CopyField);
Vue.component('ButtonSpinner', ButtonSpinner);
