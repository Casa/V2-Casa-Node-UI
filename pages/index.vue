<template>
  <div>
    <!-- This index template is intentionally left blank. -->
    <!-- Our middleware will automatically redirect the user to the appropriate page. -->

    <footer>
      <nuxt-link to="/intro" class="button">
        See Intro
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  export default {
    // Todo: Figure out how to make this not interfere with the loading redirect
    middleware: ['registered'],
  }
</script>
