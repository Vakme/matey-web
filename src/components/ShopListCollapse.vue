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
          {{ list }}
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" @click="onClickAddItem(list)">AddNewItem</a>
        <a class="card-footer-item" @click="onClickDelete(list)">DeleteList</a>
      </footer>
    </b-collapse>
  </section>
</template>

<script>
export default {
  name: "ShopListCollapse",
  props: ["list"],
  methods: {
    onClickDelete(list) {
      this.$buefy.dialog.confirm({
        message: "Really delete list " + list.name + "?",
        onConfirm: () => this.$emit("delete", list.id)
      });
    },
    onClickAddItem(list) {
      this.$buefy.dialog.prompt({
        message: "Name of the shoplist item?",
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
