<template>
  <div id="app">
    <div id="nav">
      <router-link to="/shop">MoShop</router-link>
      <router-link v-if="this.$store.state.tokenConnexion === null" to="/login"
        >login</router-link
      >
      <router-link v-if="this.$store.state.tokenConnexion === null" to="/register"
        >register</router-link
      >
      <router-link v-if="this.$store.state.tokenConnexion !== null" to="/profil"
        >profil</router-link
      >
      <router-link v-if="this.$store.state.tokenConnexion !== null" to="/monshop"
        >Shop perso</router-link
      >
      <router-link v-if="this.$store.state.tokenConnexion !== null" to="/shoppingcart"
        >Shopping Cart</router-link
      >
      <router-link v-if="this.$store.state.tokenConnexion !== null" to="" @click.native="logout()"
        >logout</router-link
      >
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data(){
    return{
      tokenConnect : null
    }
  },
  mounted() {
    axios.get("https://api-moshop.molengeek.pro/api/v1/mg/shop").then((res) => {
      localStorage.setItem("dataShop", JSON.stringify(res.data.data));
    });

  },

  computed: {
    ...mapState(["dataShop", "tokenConnexion"]),
  },

  methods: {
    logout() {
      this.$store.dispatch("updateTokenConnexion", null);
      localStorage.removeItem("tokenConnexion");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

#nav {
  padding: 30px;
  display: flex;
  min-width: 100px;
  width: 40%;
  justify-content: space-evenly;
  margin: 0 auto;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
