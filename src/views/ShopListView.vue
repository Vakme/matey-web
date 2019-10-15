<template>
  <section id="ShopList" class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title view-title">Shoplist</h1>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button type="is-success" @click="showAddShopListDialog()">
              AddList
            </b-button>
          </div>
        </div>
      </div>
      <shoplist-collapse
        v-for="list in shopLists"
        :key="list.id"
        :list="list"
        @delete="deleteShopList"
        @addItem="addShopListItem"
      ></shoplist-collapse>
    </div>
  </section>
</template>

<script>
import ShopListCollapse from "../components/ShopListCollapse";

export default {
  name: "Archive",
  components: {
    "shoplist-collapse": ShopListCollapse
  },
  data() {
    return {
      shopLists: null
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      this.$http.get("shoplist").then(response => {
        this.shopLists = response.data;
      });
    },
    showAddShopListDialog() {
      this.$buefy.dialog.prompt({
        message: "Name of the shoplist?",
        inputAttrs: {
          placeholder: "e.g. games",
          maxlength: 20
        },
        trapFocus: true,
        onConfirm: value => this.addShopList(value)
      });
    },
    addShopListItem(name, listId) {
      this.$http.post("shoplist/" + listId, { name }).then(response => {
        this.shopLists = response.data;
        this.$buefy.toast.open({
          type: "is-success",
          message: "Item added"
        });
      });
    },
    addShopList(name) {
      this.$http.post("shoplist", { name }).then(response => {
        this.shopLists = response.data;
        this.$buefy.toast.open({
          type: "is-success",
          message: "List added"
        });
      });
    },
    deleteShopList(id) {
      this.$http.delete("shoplist/" + id).then(() => {
        this.getLists();
        this.$buefy.toast.open({
          type: "is-success",
          message: "List removed"
        });
      });
    }
  }
};
</script>

<style scoped>
.inverted-title {
  color: white;
}
</style>
