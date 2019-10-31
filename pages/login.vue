<template>
  <div>
    <main>
      <img src="~/assets/logos/casa-node.svg">

      <h2>Welcome home.</h2>

      <InputField v-model="password" label="Node Password" />

      <a class="button is-primary">Sign In</a>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: '',
      }
    }
  }
</script>

<style>
  .input-wrap {
    margin: 1.5em auto 1em;
    width: 500px;
    display: block;
  }

  .button {
    width: 500px;
  }
</style>
