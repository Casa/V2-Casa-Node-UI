<template>
  <div class="migration">
    <main>
      <!-- TODO update image to SVG -->
      <img src="~/assets/icons/migration.png">

      <h2>You've chosen to migrate from Casa Node 1.</h2>
      <p class="paragraph">
        Migrating from Casa Node 1 will transfer your channels, funds, and settings. To preform the migration, you'll need physical access to both Casa Nodes.
      </p>

      <span class="pill is-red">Important Note</span>
      <p>
        This cannot be reversed and will revert your Casa Node 1 to factory settings.
      </p>
    </main>

    <footer>
      <nuxt-link to="/intro" class="button">
        Go Back
      </nuxt-link>
      <nuxt-link to="/migration/prepare" class="button is-primary">
        Begin Migration
      </nuxt-link>
    </footer>
  </div>
</template>

