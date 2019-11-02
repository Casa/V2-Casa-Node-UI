<template>
  <div>
    <h1>
      <img src="~/assets/icons/casa.svg">

      Home
    </h1>

    <UnitSwitch />

    <div class="card">
      <h5>
        Software Update Available
      </h5>

      <p>
        Upgrade Casa Node to the latest version of NodeOS.
      </p>

      <a class="button is-light is-arrow">Learn More</a>
      <a class="button is-primary">Update Now</a>
    </div>

    <div class="card">
      <h3>
        Balances
      </h3>

      <h1 class="numeric">
        158,000
      </h1>

      <div>
        <p class="numeric">
          100,000
        </p>

        Bitcoin Balance
      </div>

      <div>
        <p class="numeric">
          58,000
        </p>

        Lightning Balance
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'dashboard',
  }
</script>
