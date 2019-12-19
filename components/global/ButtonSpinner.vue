<template>
  <button
    type="submit" 
    class="button button-spinner"
    :class="{'is-dark': dark, 'loading': loading}"
    :disabled="loading"
  >
    <slot>Submit</slot>
    <span class="spinner">
      <span />
      <span />
      <span />
      <span />
    </span>
  </button>
</template>

<script>
export default {
  name: "ButtonSpinner",
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    dark: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  font-family: inherit;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
}
button::-moz-focus-inner {
  border-style: none;
  padding: 0;
}
button:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/* loading styles */
button {
  position: relative;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  transition-timing-function: ease-in;
  
  &:not(:disabled) {
    transition-delay: 0.2s;
  }
  &:not(:disabled) .spinner span {
    box-shadow: 0 0 0 0.2rem #888 inset;
    border: 7.4px solid transparent;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
  }
  &:not(:disabled) .spinner span:nth-child(1) {
    transform: rotate(0deg) !important;
  }
  &:not(:disabled) .spinner span:nth-child(2) {
    transform: rotate(90deg) !important;
  }
  &:not(:disabled) .spinner span:nth-child(3) {
    transform: rotate(180deg) !important;
  }
  &:not(:disabled) .spinner span:nth-child(4) {
    transform: rotate(270deg) !important;
  }
  
  .spinner {
    top: 50%;
    left: auto;
    right: 1.7rem;
    margin: -0.5em;
    opacity: 0;
    line-height: 1.15;
    position: absolute;
    transition-property: padding, opacity;
    transition-duration: 0.2s, 0.2s;
    transition-timing-function: ease-in, ease;
    transition-delay: 0s, 0.2s;
    
    span {
      right: 0;
      top: 0.15rem;
      width: 1.3rem;
      height: 1.3rem;
      opacity: 1;
      box-sizing: border-box;
      display: inline-block;
      position: absolute;
      border: 3.5px solid #888;
      border-radius: 50%;
      animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #888 transparent transparent transparent;
      
      &:nth-child(1) {
        animation-delay: 0.45s;
      }
      
      &:nth-child(2) {
        animation-delay: 0.3s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.15s;
      }
    }
    
  }
}

.loading .spinner {
  opacity: 1;
}
.loading .spinner span {
  opacity: 1;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* light spinner for dark backgrounds */
.is-dark {
  color: white;
  cursor: pointer;
}
.is-dark:disabled {
  pointer-events: stroke;
  cursor: not-allowed;
}
.is-dark:focus {
  outline: none;
  box-shadow: 0 0 0 3px #fff, 0 0 0 1.5px #fff;
}
.is-dark .spinner span {
  top: 0rem;
  width: 1.2rem;
  height: 1.2rem;
  border: 3.4px solid #fff;
  border-color: #fff transparent transparent transparent;
}
.is-dark:not(:disabled) .spinner span {
  border: 8.4px solid transparent;
  box-shadow: 0 0 0 0.1rem #fff inset;
}
</style>