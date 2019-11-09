<template>
  <section class="section">
    <b-collapse class="card" aria-id="contentIdForA11y3" :open="false">
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header"
        role="button"
        aria-controls="contentIdForA11y3"
      >
        <p class="card-header-title">
          {{ list.name }}
        </p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <shoplist-item
            v-for="item in list.items"
            :key="item.id"
            :item="item"
            :list="list.id"
            @deleteItem="onClickDeleteItem"
          ></shoplist-item>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="onClickAddItem(list)">
          {{ $t("shoplist.add_item") }}
        </a>
        <a class="card-footer-item" @click="onClickSumUp(list)">
          {{ $t("shoplist.sum_up") }}
        </a>
        <a class="card-footer-item" @click="onClickDelete(list)">
          {{ $t("shoplist.delete_list") }}
        </a>
      </footer>
    </b-collapse>
  </section>
</template>

<script>
import ShopListItem from "./ShopListItem";

export default {
  name: "ShopListCollapse",
  props: ["list"],
  components: {
    "shoplist-item": ShopListItem
  },
  methods: {
    onClickDelete(list) {
      this.$buefy.dialog.confirm({
        message: this.$t("shoplist.confirmation") + list.name + "?",
        onConfirm: () => this.$emit("delete", list.id)
      });
    },
    onClickSumUp(list) {
      this.$buefy.dialog.prompt({
        message: `Price:`,
        inputAttrs: {
          step: "0.01",
          type: "number",
          placeholder: "Type amount",
          value: "0",
          maxlength: 7,
          min: 0
        },
        trapFocus: true,
        onConfirm: value => this.$emit("sumUp", value, list.id)
      });
    },
    onClickDeleteItem(itemId) {
      this.$emit("deleteItem", this.list.id, itemId);
    },
    onClickAddItem(list) {
      this.$buefy.dialog.prompt({
        message: this.$t("shoplist.add_item_message"),
        inputAttrs: {
          placeholder: "e.g. the sims",
          maxlength: 50
        },
        trapFocus: true,
        onConfirm: value => this.$emit("addItem", value, list.id)
      });
    }
  }
};
</script>

<style scoped>
.section {
  padding: 0.5rem 0;
}
</style>
