<template>
  <div class="migration">
    <main>
      <img src="~/assets/icons/adapter.svg">

      <h2>Not, it's time to connect the hard drive cable.</h2>
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
      <nuxt-link to="/migration/migrating" class="button is-primary" @click="startMigration()">
        Begin Migration
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
  import API from '@/helpers/api';

  export default {
    methods: {

      async startMigration() {
        const migration = await API.post(this.$axios, `${this.$env.API_MANAGER}/v1/device/migration`);

        if (migration) {
          this.$router.push('/migrating');
        } else {
          // TODO handle error
        }
      }

    }
  }
</script>
