<template>
  <div id="app">
    <Notification />
    <Navbar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Navbar from "@/components/navigation/Navbar.vue";
import Notification from "@/components/UI/notification/Notification.vue";
export default {
  components: {
    Navbar,
    Notification,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
