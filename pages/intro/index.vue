<template>
  <div>
    <main>
      <img src="~/assets/logos/casa.svg">

      <h2>Hello there.</h2>
      <p>Let's set up your Casa Node 2.</p>
    </main>

    <footer>
      <nuxt-link to="/migration" class="button">
        Migrate from Casa Node 1
      </nuxt-link>
      <nuxt-link to="/intro/seed" class="button">
        Set Up a Fresh Node
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  import cookie from 'cookie';

  export default {
    created() {
      const cookies = cookie.parse(document.cookie);
      const torWarning = cookies.TOR_WARING;

      // Warn the user if they are using clearnet.
      if(torWarning !== 'true' && window.location.href.includes('.onion') !== true) {
        document.cookie = cookie.serialize('TOR_WARING', 'true');
        this.$router.push('/tor-warning');
      }
    },
  }
</script>
