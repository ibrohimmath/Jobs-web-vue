<template>
  <div class="fixed top-0 left-0 bg-blue-300 w-[100%] h-[100vh] flex items-center justify-center">
    <div class="spinner"></div>
  </div>
</template>
<style scoped>
.spinner {
  border: 2px solid black;
  border-top: 8px solid red;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: rotate 0.4s linear infinite forwards;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>