<template>
  <div class="mainContent">
    <h1>Bienvenue sur le site de MoShop</h1>
    <!-- <p>{{ products }}</p> -->
    <p>what's up</p>
    <div class="container-grid">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DisplayDataShop",
  data() {
    return {
      products: null,
    };
  },
  mounted() {
    this.products = this.dataShop.products;
    console.log("mounted", this.products);
    this.products[1].cover_path =
      this.products[1].cover_path.substr(
        0,
        this.products[1].cover_path.length - 3
      ) + "png";
    this.products[4].cover_path =
      this.products[4].cover_path.substr(
        0,
        this.products[4].cover_path.length - 3
      ) + "png";
  },
  computed: {
    ...mapState(["dataShop"]),
  },
};
</script>

<style lang="scss">
.mainContent {
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
    }
  }
}
</style>
