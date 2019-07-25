<template>
  <section id="Progress" class="section">
    <div class="container">
      <div class="title is-1 view-title">{{ $t("menu.progress") }}</div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <progress-tile
              title="FrontEnd"
              :milestones="frontMilestones"
            ></progress-tile>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box">
            <progress-tile
              title="BackEnd"
              :milestones="backMilestones"
            ></progress-tile>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as axios from "axios";
import ProgressTile from "../components/ProgressTile";

export default {
  name: "Progress",
  data() {
    return {
      githubInstance: null,
      frontMilestones: {},
      backMilestones: {}
    };
  },
  components: {
    "progress-tile": ProgressTile
  },
  created() {
    this.githubInstance = axios.create({
      baseURL: "https://api.github.com/repos/Vakme"
    });
  },
  mounted() {
    this.getMilestones();
  },
  methods: {
    getMilestones() {
      this.githubInstance
        .get("/matey-api/milestones")
        .then(response => {
          this.backMilestones = response.data;
        })
        .catch(() =>
          this.$toast.open({
            type: "is-danger",
            message: "ERROR: Try later"
          })
        );
      this.githubInstance
        .get("/matey-web/milestones")
        .then(response => {
          this.frontMilestones = response.data;
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
