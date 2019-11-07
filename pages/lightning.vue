<template>
  <div class="page">
    <h1>
      <img src="~/assets/icons/lightning.svg">

      Lightning
    </h1>

    <UnitSwitch />

    <Channels />
    <LightningTransactions />
  </div>
</template>

<script>
import Channels from '~/components/lightning/Channels';
import LightningTransactions from '~/components/lightning/LightningTransactions';

  export default {
    layout: 'dashboard',

    components: {
      Channels, LightningTransactions,
    },
  }
</script>
