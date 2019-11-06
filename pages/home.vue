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
  import UpdateMessage from '~/components/home/cards/UpdateMessage';
  import BalanceGraph from '~/components/home/cards/BalanceGraph';
  import NodeSummary from '~/components/home/cards/NodeSummary';
  import Statuses from '~/components/home/cards/Statuses';
  import LightningBalances from '~/components/home/cards/LightningBalances';
  import SatsApp from '~/components/home/cards/SatsApp';

  export default {
    layout: 'dashboard',

    components: {
      UpdateMessage, BalanceGraph,
      NodeSummary, Statuses,
      LightningBalances, SatsApp,
    },
  }
</script>
