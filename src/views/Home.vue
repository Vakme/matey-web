<template>
  <div class="home">
    {{ errors }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      errors: ""
    };
  }
};
</script>
