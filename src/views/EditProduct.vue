<template>
  <div class="mainContent">
    <h1>Edition des données du produit</h1>

    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Nom du produit</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="productData.name"
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
          v-model="productData.description"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">prix du produit</label>
        <input
          type="number"
          min="0"
          class="form-control"
          id="price"
          v-model="productData.price"
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
      productData: {
        name: null,
        description: null,
        price: null,
        cover: null,
      },
    };
  },

  mounted(){
      let dataTmp = this.$store.state.dataMonShop.products.filter((product)=>product.id ===this.$route.params.productId)[0]
      this.productData.name = dataTmp.name
      this.productData.description = dataTmp.description
      this.productData.price = dataTmp.price
  },
  

  methods: {
    sendData(e) {
        e.preventDefault()
        if(this.productData.name.length>=4 && this.productData.description.length>=4){

            let tokenReq = this.$store.state.tokenConnexion
            let formRequest = new FormData();
            formRequest.append('name',this.productData.name)
            formRequest.append('description',this.productData.description)
            formRequest.append('price',this.productData.price)

            // modifie data de mon produit
          axios
            .put("https://api-moshop.molengeek.pro/api/v1/product/"+this.$route.params.productId, formRequest, {
              headers: { Authorization: "Bearer " + tokenReq },
            })
            .then((response) => {
              console.log("Edit produit", response);
    
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
                        this.$router.push({path:'/monshop'})
                      })

            });
        }else{
            console.log('le nom ou la description du produit ne contiennent pas assez de caractère')
        }


        
    },

    uploadFile() {
      this.productData.cover = this.$refs.file.files[0];
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
