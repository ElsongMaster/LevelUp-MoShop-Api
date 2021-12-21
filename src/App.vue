<template>
  <div id="app">
    <div id="nav">
      <router-link to="/shop">MoShop</router-link>
      <router-link to="/login">login</router-link>
      <router-link to="/register">register</router-link>
    </div>
    <router-view />
    <!-- <p>{{dataShop.data}}</p> -->
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  mounted() {
    axios.get("https://api-moshop.molengeek.pro/api/v1/mg/shop").then((res) => {
      console.log(res.data.data);
      this.$store.dispatch("updateDataShop", res.data.data);
    });
  },

  computed: {
    ...mapState(["dataShop"]),

    
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
  width: 25%;
  // border: 2px solid;
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
