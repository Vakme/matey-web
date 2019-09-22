<template>
  <div id="Summary" class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ $t("expenses_modal.summary_title") }}</p>
    </header>
    <section class="modal-card-body">
      <div class="level">
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
    <footer class="modal-card-foot has-text-right">
      <button class="button" type="button" @click="$parent.close()">
        {{ $t("expenses_modal.close") }}
      </button>
      <button class="button is-primary" type="submit" @click="moveToArchive">
        {{ $t("expenses_modal.submit") }}
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Summary",
  data() {
    return {
      summary: { creditor: "", diff: 0 },
      error: ""
    };
  },
  mounted() {
    this.$http
      .get("summary")
      .then(response => (this.summary = response.data))
      .catch(() => {
        this.$parent.close();
      });
  },
  methods: {
    moveToArchive() {
      this.$clipboard(this.summary.diff.toLocaleString());
      this.$http.post("archive").then(() => {
        this.$emit("update", { me: { funds: [] }, partner: { funds: [] } });
        this.$buefy.toast.open({
          type: "is-success",
          message: "Moved and copied successfully"
        });
        this.$router.push("archive");
      });
    }
  }
};
</script>

<style scoped>
.level.is-mobile {
  flex-wrap: wrap;
}
.modal-card-foot {
  justify-content: space-between;
}
</style>
