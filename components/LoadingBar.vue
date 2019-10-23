<template>
  <div class="loading-bar">
    <div class="loading-progress" :style="{ width: percent + '%' }"></div>
  </div>
</template>

<script>
  export default {
    props: {
      'percent': {
        default: 0,
        type: Number
      },
    },
  }
</script>

<style lang="scss">
  @import "~/assets/css/variables.scss";

  .loading-bar {
    width: 300px;
    margin: 0 85px;
    height: 3px;
    background-color: $backgroundDarkGray;
  }

  .loading-progress {
    height: 3px;
    background-color: $textPurple;
    transition: width 10s;
  }
</style>
