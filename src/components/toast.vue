<template>
  <div v-if="isVisible" :class="['toast', `toast--${type}`]">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'error',
  },
  message: {
    type: String,
    default: "Failed",
  },
  duration: {
    type: Number,
    default: 3000, // Duration for the toast to be visible (in ms)
  },
});

const isVisible = ref(false);

// Show the toast when the component is mounted
onMounted(() => {
  isVisible.value = true;

  // Hide the toast after the specified duration
  setTimeout(() => {
    isVisible.value = false;
  }, props.duration);
});

// Clean up if the component is unmounted before the toast disappears
onBeforeUnmount(() => {
  isVisible.value = false;
});
</script>

<style>
.toast {
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: 2s toast-in cubic-bezier(1, 0, 0, 1) forwards;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 999;
}

.toast--success {
  background-color: #4caf50;
}

.toast--error {
  background-color: #f44336;
}

.toast--info {
  background-color: #2196f3;
}

/* Keyframes for the "fast and hit by rock" effect */
@keyframes toast-in {
  0% {
    transform: translateX(100%);
    /* Start from outside */
  }

  40% {
    transform: translateX(0);
    /* Fast approach to the middle */
  }


  80% {
    transform: translateX(0);
    /* Resume and smooth out */
  }

  100% {
    transform: translateX(100%);
    /* End by going outside again, or stay at 0 if you want it to remain visible */
  }
}
</style>
