<template>
  <article class="progress-tile">
    <div class="title">{{ title }}</div>
    <div v-for="m in milestones" :key="m.number">
      <div class="level">
        <div class="level-left">
          <div class="level-item subtitle">
            {{ m.title }}
            <b-icon
              class="closed-icon"
              v-if="m.state === 'closed'"
              type="is-success"
              icon="check-all"
            ></b-icon>
          </div>
        </div>
        <div class="level-right">
          <a class="level-item" :href="m.html_url" target="_blank">
            <b-button size="is-small" type="is-link" icon-left="github-circle">
              {{ $t("progress.details") }}
            </b-button>
          </a>
        </div>
      </div>
      <b-tooltip
        class="tooltip"
        :label="
          $t('progress.closed') +
            ': ' +
            m.closed_issues +
            '/' +
            calculateSum(m.open_issues, m.closed_issues) +
            ' ' +
            $t('progress.issues')
        "
      >
        <progress
          :class="['progress', calculateColor(m.open_issues, m.closed_issues)]"
          :value="calculatePercentage(m.open_issues, m.closed_issues)"
        ></progress>
      </b-tooltip>
    </div>
  </article>
</template>

<script>
export default {
  name: "ProgressTile",
  props: ["milestones", "title"],
  methods: {
    calculatePercentage(open, closed) {
      if (closed === 0) return 0.01;
      return closed / (open + closed);
    },
    calculateSum(open, closed) {
      return open + closed;
    },
    calculateColor(open, closed) {
      const percentage = this.calculatePercentage(open, closed);
      if (percentage < 0.35) return "is-danger";
      else if (percentage < 0.75) return "is-warning";
      else return "is-success";
    }
  }
};
</script>

<style scoped>
.tooltip {
  width: 100%;
  margin-bottom: 50px;
}
.closed-icon {
  margin-left: 10px;
}
</style>
