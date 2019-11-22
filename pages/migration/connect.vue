<template>
  <div class="migration">
    <main>
      <img src="~/assets/icons/adapter.svg">

      <h2>Now it's time to connect the hard drive cable.</h2>
      <p class="paragraph">
        This step will enable you to transfer data between the two nodes.
      </p>

      <span class="pill is-yellow">Step 1</span>
      <p class="paragraph">
        Ensure your Casa Node 1 is unplugged.
      </p>

      <span class="pill is-yellow">Step 2</span>
      <p class="paragraph">
        On Casa Node 1, unplug the hard drive cable from the USB port.
      </p>

      <span class="pill is-yellow">Step 3</span>
      <p>
        Plug the cable from the Casa Node 1 into the USB Port on Casa Node 2.
      </p>
    </main>

    <footer>
      <nuxt-link to="/migration/prepare" class="button">
        Go Back
      </nuxt-link>
      <span class="button is-primary" @click="startMigration()">
        Begin Migration
      </span>
    </footer>
  </div>
</template>

<script>
  export default {
    methods: {

      async startMigration() {
        try {
          await this.$axios.post(`${this.$env.API_MANAGER}/v1/device/migration`);
          this.$router.push('/migration/migrating');
        } catch (error) {
          // TODO handle error
        }
      }
    }
  }
</script>
