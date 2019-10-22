<template>
  <section id="Progress" class="section">
    <div class="container">
      <div class="title is-1 view-title">{{ $t("menu.progress") }}</div>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <div class="title">About</div>
            <article class="content is-size-6">
              <p>
                According to
                <a
                  href="https://www.marriage.com/advice/divorce/10-most-common-reasons-for-divorce/"
                  target="_blank"
                  >marriage.com</a
                >, money and lack of communication are among the top three
                reasons for divorce. This realization hit the creators hard when
                they moved in together. After the first month, they created a
                formula to help them reach financial clearance. After the next
                few months, they decided that they are too lazy to calculate it
                every time. So she implemented it.
              </p>
              <p>
                One summer night, he invented a pun: "EKSPRESSO!". And after
                some time, when the prototype was up and working, this phrase
                became its name.
              </p>
              <p>
                And so, Ekspresso became the tool not only for finances but also
                for communication and cooperation between the creators.
              </p>
              <p><i>We hope you would find it helpful too.</i></p>
            </article>
            <div class="title">Creators</div>
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="creator.avatar_url" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>Olka</strong>
                    <small> @{{ creator.login }}</small> <br />
                    Huge Vue.js fan. Lover of math pun T-shirts. Advocate for
                    klutz laws who would forget almost everything if given a
                    chance and access to a gaming console. <br />
                    Coder and designer of Ekspresso.
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item">
                      <b-icon icon="github-circle"></b-icon>
                    </a>
                    <a class="level-item">
                      <b-icon icon="stack-overflow"></b-icon>
                    </a>
                    <a class="level-item">
                      <b-icon icon="web"></b-icon>
                    </a>
                  </div>
                </nav>
              </div>
            </article>

            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img
                    :src="`${publicPath}Rico-character-web-desktop.png`"
                    alt="mockups"
                  />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>Rico</strong><br />
                    Video games geek. Literal cat. <br />
                    Main tester and supporter.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box">
            <progress-tile
              title="Progress"
              :milestones="milestones"
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
      milestones: [],
      creator: {},
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    "progress-tile": ProgressTile
  },
  created() {
    this.githubInstance = axios.create({
      baseURL: "https://api.github.com"
    });
  },
  mounted() {
    this.getMilestones();
  },
  methods: {
    getMilestones() {
      this.githubInstance
        .get("/repos/Vakme/matey-api/milestones?state=all")
        .then(response => {
          let backMilestones = response.data;
          this.githubInstance
            .get("/repos/Vakme/matey-web/milestones?state=all")
            .then(response => {
              let frontMilestones = response.data;
              this.milestones = this.mergeMilestones(
                frontMilestones,
                backMilestones
              );
              this.creator = this.milestones[0].creator;
            });
        });
    },
    mergeMilestones(frontMilestones, backMilestones) {
      const newMilestones = [];
      for (let frontM of frontMilestones) {
        const backM = backMilestones.find(m => frontM.title === m.title);
        if (backM) {
          frontM.closed_issues += backM.closed_issues;
          frontM.open_issues += backM.open_issues;
          frontM.state =
            backM.state === "closed" && frontM.state === "closed"
              ? "closed"
              : "open";
        }
        newMilestones.push(frontM);
      }
      return newMilestones;
    }
  }
};
</script>

<style scoped></style>
