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

// Register Global Notifications
import { defaultConfig, errorConfig, successConfig } from '~/helpers/notifications';

Vue.toasted.register('default', payload => {
    if (!payload.message) {
      return 'Sorry, something went wrong. Please try again.';
    }
    return payload.message;
  },
  defaultConfig
);

Vue.toasted.register('error', payload => {
    if (!payload.message) {
      return 'Sorry, something went wrong. Please try again.';
    }
    return payload.message;
  },
  errorConfig
);

Vue.toasted.register('success', payload => {
    if (!payload.message) {
      return 'Success.';
    }
    return payload.message;
  },
  successConfig
);
