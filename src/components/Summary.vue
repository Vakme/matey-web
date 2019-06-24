<template>
  <div id="Summary" class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Summary</p>
    </header>
    <section class="modal-card-body">
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <p class="heading">Return to</p>
          <p class="title">{{ summary.creditor }}</p>
        </div>
        <div class="level-item has-text-centered">
          <p class="heading">Value</p>
          <p class="title">{{ summary.diff.toLocaleString() }} zł</p>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Summary",
  data() {
    return {
      summary: {},
      error: ""
    };
  },
  mounted() {
    this.$http
      .get("summary")
      .then(response => (this.summary = response.data))
      .catch(e => (this.error = e));
  }
};
</script>

<style scoped></style>
