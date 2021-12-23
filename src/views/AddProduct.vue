<template>
  <div class="mainContent">
    <h1>Ajouter un produit à mon shop</h1>

    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Nom du produit</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="bodyData.name"
        />
        <div id="emailHelp" class="form-text"></div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label"
          >description du produit</label
        >
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="bodyData.description"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">prix du produit</label>
        <input
          type="number"
          min="0"
          class="form-control"
          id="price"
          v-model="bodyData.price"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">image du produit</label>
        <input
          type="file"
          min="0"
          class="form-control"
          id="cover"
          @change="uploadFile()"
          ref="file"
        />
      </div>

      <button type="submit" class="btn btn-primary" @click="sendData($event)">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddProduct",
  data() {
    return {
      bodyData: {
        name: null,
        description: null,
        price: null,
        cover: null,
      },
    };
  },

  methods: {
    sendData(e) {
      e.preventDefault();
      let tokenReq = this.$store.state.tokenConnexion;
      let formRequest = new FormData();
      formRequest.append("name", this.bodyData.name);
      formRequest.append("description", this.bodyData.description);
      formRequest.append("price", this.bodyData.price);
      formRequest.append("cover", this.bodyData.cover);
      axios
        .post("https://api-moshop.molengeek.pro/api/v1/product", formRequest, {
          headers: { Authorization: "Bearer " + tokenReq },
        })
        .then((response) => {
            console.log(response)
          // Recuperer data mon shop
          axios
            .get("https://api-moshop.molengeek.pro/api/v1/shop", {
              headers: { Authorization: "Bearer " + tokenReq },
            })
            .then((res) => {
              console.log("monshop", res);
              let dataShop = res.data.data;
              localStorage.setItem(
                "dataMonShop",
                JSON.stringify(res.data.data)
              );
              this.$store.dispatch("updateDataMonShop", dataShop);
            })

        });
    },

    uploadFile() {
      this.bodyData.cover = this.$refs.file.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.mainContent {
  width: 99vw;
  min-height: 90vh;
  height: fit-content;
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;
  //   h1 {
  //     font-size: 30px;
  //     font-weight: bold;
  //   }
  form {
    width: 50%;
    height: 80%;
    border: 1px solid rgba(128, 128, 128, 0.5);
    padding: 50px;
    border-radius: 10px;
  }
}
</style>
