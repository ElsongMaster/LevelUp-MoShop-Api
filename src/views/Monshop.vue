<template>
  <div class="mainContent">
    <h1>Bienvenue sur le site de {{ dataMonShop.name }}</h1>
    <div v-if="products.length > 0" class="container-grid">
      <div
        v-for="product in products"
        :key="product.id"
        :class="'grid-item grid-item' + product.id"
      >
        <div class="container-img">
          <img
            :src="'https://api-moshop.molengeek.pro' + product.cover_path"
            :alt="product.name"
          />
        </div>
        <div class="container-details">
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price }}$</p>
          <p class="description">{{ product.description }}</p>
        </div>
        <div class="addCart-container">
          <span @click="addToCart(product.id)">Add Cart</span>
          <p v-if="successMsg">product successfully add to cart</p>
        </div>
        <div class="container-icon_modif">
          <span class="edit-product" @click="editProduct(product.id)"
            ><i class="fas fa-edit"></i
          ></span>
          <span class="delete-product" @click="deleteProduct(product.id)"
            ><i class="fas fa-trash-alt"></i
          ></span>
        </div>
      </div>
    </div>
    <router-link to="/monshop/addproduct" class="addproduct_link">
      Ajouter un produit</router-link
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "MonShop",
  data() {
    return {
      products: [],
      successMsg: false,
    };
  },
  mounted() {
    this.products = this.$store.state.dataMonShop.products;
  },
  computed: {
    ...mapState(["dataMonShop"]),
  },

  methods: {
    editProduct(productIdData) {
      this.$router.push({
        name: "EditProduct",
        params: { productId: productIdData },
      });
    },

    deleteProduct(productIdData) {
      let tokenReq = this.$store.state.tokenConnexion;

      // modifie data de mon produit
      axios
        .delete(
          "https://api-moshop.molengeek.pro/api/v1/product/" + productIdData,
          {
            headers: { Authorization: "Bearer " + tokenReq },
          }
        )
        .then((res) => {
          console.log("suppresion produit", res);

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
              //   this.$router.push({ path: "/monshop" });

              this.products = this.products.filter(
                (product) => product.id != productIdData
              );
            });
        });
    },

    addToCart(productId) {
      let tokenReq = this.$store.state.tokenConnexion;
      let formRequest = new FormData();
      let quantity = Math.floor(Math.random() * 10) + 1;
      formRequest.append("product", productId);
      formRequest.append("quantity", quantity);
      // Ajoute le produit à ma cart
      axios
        .post("https://api-moshop.molengeek.pro/api/v1/cart", formRequest, {
          headers: { Authorization: "Bearer " + tokenReq },
        })
        .then((res) => {
          console.log("addCart", res);
          this.successMsg = true;

          setTimeout(() => (this.successMsg = false), 3000);

          // Recuperer data cart(après l'ajout)
          axios
            .get("https://api-moshop.molengeek.pro/api/v1/cart", {
              headers: { Authorization: "Bearer " + tokenReq },
            })
            .then((res) => {
              console.log("cart", res);
              let dataCart = res.data.data;
              localStorage.setItem("dataCart", JSON.stringify(dataCart));
            });
        });
    },
  },
};
</script>

<style lang="scss">
.mainContent {
  width: 99vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .container-grid {
    display: grid;
    width: 90%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    grid-auto-rows: minmax(250px, auto);
    margin-top: 40px;

    .grid-item {
      width: 350px;
      min-height: 500px;
      display: flex;
      flex-direction: column;
      border: 1px solid;
      background-color: rgb(219, 215, 215);
      position: relative;

      .container-img {
        display: flex;
        justify-content: center;
        height: 50%;
        width: 100%;
        // border: 1px solid green;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 5px;
        }
      }

      .container-details {
        h3 {
          color: rgb(191, 29, 0);
        }
      }
      .addCart-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        span {
          width: 80%;
          min-width: 50px;
          padding: 0.5em 1em;
          border: 1px solid white;
          background-color: white;
          border-radius: 5px;
        }
        span:hover {
          cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
            auto;
          background-color: rgb(0, 132, 255);
        }
        p {
          color: green;
        }
      }
      .container-icon_modif {
        display: flex;
        width: 100px;
        justify-content: space-evenly;
        position: absolute;
        bottom: 10px;
        left: 30%;
        .edit-product,
        .delete-product {
          display: inline-flex;
          padding: 10px;
        }
        .edit-product:hover,
        .delete-product:hover {
          cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
            auto;
        }

        .edit-product {
          background-color: rgb(230, 230, 10);
        }

        .delete-product {
          background-color: rgb(255, 51, 0);
        }
      }
    }
  }
  .addproduct_link {
    background-color: rgb(0, 183, 255);
    color: black;
    font-weight: bold;
    padding: 5px 10px;
    margin-top: 10px;
  }
}
</style>
