<template>
  <div>
    <header>
      <div class="is-pulled-right">
        Header Section<br>
        hello world
      </div>
    </header>

    <main>
      <LoadingBar percent="50" />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
  import LoadingBar from '@/components/LoadingBar';

  export default {
    components: {
      LoadingBar,
    },
  }
</script>
