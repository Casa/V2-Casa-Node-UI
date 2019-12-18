// 3rd party components
import Vue from 'vue';
import VueQriously from 'vue-qriously';
import VTooltip from 'v-tooltip';
import ToggleButton from 'vue-js-toggle-button';

Vue.use(VueQriously);
Vue.use(VTooltip);
Vue.use(ToggleButton);

// Custom components
import UnitSwitch from '~/components/global/UnitSwitch';
import Footer from '~/components/global/Footer';
import InputField from '~/components/global/InputField';
import Modal from '~/components/global/Modal';
import ModalClose from '~/components/global/ModalClose';
import CopyField from '~/components/global/CopyField';

Vue.component('UnitSwitch', UnitSwitch);
Vue.component('Footer', Footer);
Vue.component('InputField', InputField);
Vue.component('Modal', Modal);
Vue.component('ModalClose', ModalClose);
Vue.component('CopyField', CopyField);
