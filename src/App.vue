<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  setup() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 10px;
}
</style>
