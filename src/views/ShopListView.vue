<template>
  <section id="ShopList" class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title view-title">
            {{ $t("shoplist.title") }}
          </h1>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button type="is-success" @click="showAddShopListDialog()">
              {{ $t("shoplist.add_list") }}
            </b-button>
          </div>
        </div>
      </div>
      <shoplist-collapse
        v-for="list in shopLists"
        :key="list.id"
        :list="list"
        @delete="deleteShopList"
        @deleteItem="deleteShopListItem"
        @addItem="addShopListItem"
        @sumUp="sumUpShopList"
      ></shoplist-collapse>
    </div>
    <b-modal :active.sync="addModal">
      <modal-add
        @update="onNewExpense"
        :expense="currentExpense"
        :edit="editMode"
      ></modal-add>
    </b-modal>
  </section>
</template>

<script>
import ShopListCollapse from "../components/ShopListCollapse";
import ExpenseForm from "../components/ExpenseForm";

export default {
  name: "Archive",
  components: {
    "shoplist-collapse": ShopListCollapse,
    "modal-add": ExpenseForm
  },
  data() {
    return {
      shopLists: null,
      addModal: false,
      currentExpense: null,
      editMode: false
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    async getLists() {
      const response = await this.$http.get("shoplist");
      this.shopLists = response.data;
    },
    showAddShopListDialog() {
      this.$buefy.dialog.prompt({
        message: this.$t("shoplist.add_message"),
        inputAttrs: {
          placeholder: "Games",
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
    async sumUpShopList(price, listId) {
      await this.getLists();
      const idList = this.shopLists
        .find(list => list.id === listId)
        .items.filter(listItem => listItem.checked === true)
        .map(item => item.id);
      await this.$http.delete("shoplist/" + listId + "/items", { data: idList });
      await this.getLists();
      this.currentExpense = {
        name: "",
        description: "",
        date: new Date(),
        value: parseFloat(price),
        type: "outcome",
        subtype: "common"
      };
      this.addModal = true;
    },
    onNewExpense() {
      this.$router.push("/expenses", () =>
        this.$buefy.toast.open({
          type: "is-success",
          message: "List summed up"
        })
      );
    },
    deleteShopList(id) {
      this.$http.delete("shoplist/" + id).then(() => {
        this.getLists();
        this.$buefy.toast.open({
          type: "is-success",
          message: "List removed"
        });
      });
    },
    deleteShopListItem(listId, itemId) {
      this.$http.delete("shoplist/" + listId + "/items/" + itemId).then(() => {
        this.getLists();
        this.$buefy.toast.open({
          type: "is-success",
          message: "Item removed"
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
