<template>
  <div>
    <!-- This index template is intentionally left blank. -->
    <!-- Our middleware will automatically redirect the user to the appropriate page. -->
  </div>
</template>

<script>
  export default {
    middleware: ['registered', 'authenticated'],

    // This will only be called if none of the middleware is triggered.
    // In which case, the user is already registered and logged in.
    mounted() {
      this.$router.push({path: '/home'});
    }
  }
</script>
