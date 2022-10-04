<template>
  <div class="spin"></div>
</template>

<script>
export default {

}
</script>

<style>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #ff8800;
  animation: rotation 0.8s ease-in-out infinite;
}
@keyframes rotation {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>