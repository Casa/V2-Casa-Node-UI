<template>
  <div class="page">
    <h1>
      <img src="~/assets/icons/casa.svg">

      Home
    </h1>

    <UnitSwitch />

    <UpdateMessage />
    <BalanceGraph />

    <div class="cards">
      <NodeSummary />
      <Statuses />
    </div>

    <div class="cards">
      <LightningBalances />
      <SatsApp />
    </div>
  </div>
</template>

<script>
  import UpdateMessage from '~/components/home/UpdateMessage';
  import BalanceGraph from '~/components/home/BalanceGraph';
  import NodeSummary from '~/components/home/NodeSummary';
  import Statuses from '~/components/home/Statuses';
  import LightningBalances from '~/components/home/LightningBalances';
  import SatsApp from '~/components/home/SatsApp';

  export default {
    layout: 'dashboard',

    components: {
      UpdateMessage, BalanceGraph,
      NodeSummary, Statuses,
      LightningBalances, SatsApp,
    },
  }
</script>
