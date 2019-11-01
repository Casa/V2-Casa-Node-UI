<template>
  <a class="button" @click="closeModal()">
    <slot>Close</slot>
  </a>
</template>

<script>
  import Events from '~/helpers/events';

  export default {
    methods: {
      closeModal() {
        Events.$emit('modal-closed');
      }
    }
  }
</script>
