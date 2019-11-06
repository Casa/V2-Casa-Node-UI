<template>
    <div>
        <main>
            <!-- TODO update image to SVG-->
            <img src="~/assets/icons/migration.png">

            <h2>Migrating to Casa Node 2...</h2>
            <br/>
            <LoadingBar :percent="percent" />
        </main>
    </div>
</template>

<script>
  import LoadingBar from '@/components/LoadingBar';

  export default {
    components: {
      LoadingBar,
    },

    data() {
      return {
        percent: 1, // Always give the user a little something to see
      }
    }
  }
</script>
