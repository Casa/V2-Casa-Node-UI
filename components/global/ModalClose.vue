<template>
  <a class="button" @click="closeModal()">
    <slot>Go Back</slot>
  </a>
</template>

<script>
  import Events from '~/helpers/events';

  export default {
    methods: {
      closeModal() {
        Events.$emit('modal-close');
      }
    }
  }
</script>
