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
      <nuxt-link to="/migration/migrating" class="button is-primary">
        Begin Migration
      </nuxt-link>
    </footer>
  </div>
</template>
