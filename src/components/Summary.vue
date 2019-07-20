<template>
  <div id="Summary" class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("expenses_modal.summary_title") }}</p>
    </header>
    <section class="modal-card-body">
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">{{ $t("expenses_modal.return_to") }}</p>
            <p class="title">{{ summary.creditor }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">{{ $t("expenses_modal.value") }}</p>
            <p class="title">{{ summary.diff.toLocaleString() }} zł</p>
          </div>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        {{ $t("expenses_modal.close") }}
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
      .catch(() => {
        this.$toast.open({
          type: "is-danger",
          message: "ERROR: Try later"
        });
        this.$parent.close();
      });
  }
};
</script>

<style scoped>
.level.is-mobile {
  flex-wrap: wrap;
}
</style>
