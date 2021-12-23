<template>
  <div class="mainContent">
    <h1>Bienvenue sur la page de mon panier</h1>
    <div
      class="container-Dataproduct"
      v-for="data in cartData"
      :key="data.product.id"
    >
      <img
        :src="'https://api-moshop.molengeek.pro' + data.product.cover_path"
        :alt="data.product.name"
      />
      <div class="dataText">
        <p>{{ data.product.name }}</p>
        <p>{{ data.product.description }}</p>
      </div>
      <div class="dataStock">
        <div class="stock-container">
          <div>
            <span class="stock">in Stock:</span
            ><span class="quantity">{{ data.quantity }}</span
            ><span class="price">${{ data.product.price }}</span>
          </div>
          <div class="total_quantity">
            <div>
              <i
                class="fas fa-minus"
                @click="soustractQuantityProduct(data.id)"
              ></i>
              <input
                type="number"
                min="0"
                :value="quantitiesChoosen[data.id]"
              />
              <i class="fas fa-plus" @click="addQuantityProduct(data.id)"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="items_total-container">
        <div class="items_total">
          <span>Item SousTotal: </span>
          <span>${{ quantitiesChoosen[data.id] * data.product.price }}</span>
        </div>
      </div>
      <div class="container-icon">
        <span class="delete-productCart" @click="deleteProductCart(product.id)"
          ><i class="fas fa-trash-alt"></i
        ></span>
      </div>
    </div>
    <div class="items_total-container">
      <div class="items_total">
        <span>Item Total:</span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Displaycart",

  data() {
    return {
      cartData: [],
      quantitiesChoosen: {},

    };
  },

  mounted() {
    this.cartData = JSON.parse(localStorage.getItem("dataCart"));
    this.cartData.forEach((elt) => {
      let productId = elt.id;
      this.quantitiesChoosen[productId] = 0;
    });
  },

  computed: {},

  methods: {
    soustractQuantityProduct(productId) {
      if (this.quantitiesChoosen[productId] - 1 >= 0)
        this.quantitiesChoosen[productId]--;
    },
    addQuantityProduct(productId) {

      let product = this.cartData.filter(
        (product) => product.id == productId
      )[0];
      if (this.quantitiesChoosen[productId] + 1 <= product.quantity)
        this.quantitiesChoosen[productId]++;
    },
  },
};
</script>

<style lang="scss" scoped>
.mainContent {
  .container-Dataproduct {
    display: flex;
    border:  1px solid rgb(128, 128, 128);
    margin: 25px 0;
    img {
      height: 100px;
      width: 150px;
    }

    i {
      color: gray;
    }
    i:hover {
      cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
        auto;
    }

    input {
      border: 1px solid;
      outline: none;
      width: 50px;
    }
    .dataText {
      width: 30%;
    }
    .dataStock {
      width: 30%;
      .stock-container {
        > div {
          display: flex;
          justify-content: space-between;
          width: 80%;
        }
        .total_quantity {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          > div {
            display: flex;
            justify-content: space-evenly;
            width: 50%;
          }
        }
      }
    }
    .container-icon {
      .delete-productCart {
        display: flex;
        height: 100%;
        justify-content: flex-end;
        i {
            height: fit-content;
          padding: 10px;
          background-color: red;
          color: black;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
