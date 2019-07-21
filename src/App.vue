<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
    <b-loading :active.sync="isNotInit"></b-loading>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    isNotInit() {
      return !this.$store.getters["auth/getInitState"];
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
body {
  background: #43cea2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #185a9d,
    #43cea2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #185a9d,
    #43cea2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 100vh;
}
</style>
