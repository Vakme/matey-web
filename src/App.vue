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
