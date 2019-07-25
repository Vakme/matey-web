<template>
  <div id="app">
    <navbar></navbar>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
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
  background: #f2994a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #f2c94c,
    #f2994a
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #f2c94c,
    #f2994a
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  min-height: 100vh;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
