<template>
  <div>
    <header>
      Header Section
    </header>

    <main>
      <LoadingBar percent="50" />
    </main>

    <footer>
      Footer Buttons
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
