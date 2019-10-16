<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <div class="strike-container" @click="strikeThroughItem(item)">
          {{ item.name }}
          <transition name="strike">
            <div v-if="strike" class="strike-line"></div>
          </transition>
        </div>
      </div>
    </div>
    <div class="media-right">
      <b-icon
        icon="delete"
        class="is-clickable"
        @click.native="onClickDeleteItem(item)"
      ></b-icon>
    </div>
  </article>
</template>

<script>
export default {
  name: "ShopListItem",
  props: ["item", "list"],
  data() {
    return {
      strike: this.item.checked
    };
  },
  methods: {
    onClickDeleteItem(item) {
      this.$buefy.dialog.confirm({
        message: this.$t("shoplist.confirmation") + item.name + "?",
        onConfirm: () => this.$emit("deleteItem", item.id)
      });
    },
    strikeThroughItem(item) {
      this.strike = !this.strike;
      const newItem = {
        name: item.name,
        checked: this.strike
      };
      this.$http.put("shoplist/" + this.list + "/items/" + item.id, newItem);
    }
  }
};
</script>

<style scoped>
.is-clickable {
  cursor: pointer;
}
.strike-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.strike-line {
  position: absolute;
  top: 50%;
  background-color: #fff;
  height: 2px;
  width: 100%;
}

.strike-enter-active {
  animation: strike-through 0.5s;
}
.strike-leave-active {
  animation: strike-through 0.5s reverse;
}

.strike-leave-to,
.strike-enter {
  right: 0;
}
@keyframes strike-through {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
