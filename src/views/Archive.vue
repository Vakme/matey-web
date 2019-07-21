<template>
  <section id="Archive" class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">{{ $t("archive.title") }}</h1>
        </div>
      </div>
      <b-tabs v-model="activeTab">
        <b-tab-item :label="$t('archive.my_tab')">
          <expense-array :funds="myArchive" :removable="false"></expense-array>
        </b-tab-item>
        <b-tab-item :label="$t('archive.partner_tab')">
          <expense-array
            :funds="partnerArchive"
            :removable="false"
          ></expense-array>
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import ExpenseArray from "../components/ExpenseArray";

export default {
  name: "Archive",
  components: {
    "expense-array": ExpenseArray
  },
  data() {
    return {
      myArchive: [],
      partnerArchive: [],
      activeTab: 0
    };
  },
  mounted() {
    this.getArchive();
  },
  methods: {
    getArchive() {
      this.$http
        .get("archive")
        .then(response => {
          console.log(response.data);
          this.myArchive = response.data.me.archive;
          this.partnerArchive = response.data.partner.archive;
        })
        .catch(() =>
          this.$toast.open({
            type: "is-danger",
            message: "ERROR: Try later"
          })
        );
    }
  }
};
</script>

<style scoped></style>
