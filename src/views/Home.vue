<template>
  <section class="home section">
    <div class="container">
      {{ token }}
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      errors: ""
    };
  },
  computed: {
    token() {
      return this.$store.getters["auth/getUser"].getAuthResponse().id_token;
    }
  }
};
</script>
