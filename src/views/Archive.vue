<template>
  <section id="Archive" class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title view-title">{{ $t("archive.title") }}</h1>
        </div>
      </div>
      <b-tabs v-model="activeTab" class="box">
        <b-tab-item :label="$t('archive.my_tab')">
          <div v-for="(chunk, i) in myArchive" :key="i">
            <h2 class="subtitle">
              {{ $d(new Date(chunk[0].date), "month") | capitalize }}
            </h2>
            <expense-array :funds="chunk" :removable="false"></expense-array>
          </div>
        </b-tab-item>
        <b-tab-item :label="$t('archive.partner_tab')">
          <div v-for="(chunk, i) in partnerArchive" :key="i">
            <h2 class="subtitle">
              {{ $d(new Date(chunk[0].date), "month") | capitalize }}
            </h2>
            <expense-array :funds="chunk" :removable="false"></expense-array>
          </div>
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
    chunkArrayByMonth(arr) {
      arr = arr.sort((a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return a < b ? -1 : a > b ? 1 : 0;
      });
      let finalArr = [];
      let month = new Date(arr[0].date).getMonth(),
        newInd = 0;
      for (let ind in arr) {
        if (new Date(arr[ind].date).getMonth() !== month) {
          finalArr.push(arr.slice(newInd, ind));
          newInd = ind;
          month = new Date(arr[ind].date).getMonth();
        }
      }
      finalArr.push(arr.slice(newInd, arr.length));
      return finalArr;
    },
    getArchive() {
      this.$http
        .get("archive")
        .then(response => {
          console.log(response.data);
          this.myArchive = this.chunkArrayByMonth(response.data.me.archive);
          this.partnerArchive = this.chunkArrayByMonth(
            response.data.partner.archive
          );
        })
        .catch(() =>
          this.$toast.open({
            type: "is-danger",
            message: "ERROR: Try later"
          })
        );
    }
  },
  filters: {
    capitalize(val) {
      return val.toString().toLocaleUpperCase();
    }
  }
};
</script>

<style scoped></style>
