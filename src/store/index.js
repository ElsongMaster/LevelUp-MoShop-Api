import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataShop:JSON.parse(localStorage.getItem('dataShop')),
    tokenConnexion:JSON.parse(localStorage.getItem('tokenConnexion')),
   
  },
  mutations: {
    setDataShop(state, dataShop){
      state.dataShop = dataShop;
    },
    setTokenConnexion(state, token){
      state.tokenConnexion = token;
    }
  },
  actions: {
    updateDataShop({commit},dataShop){
      commit('setDataShop',dataShop)
    },
    updateTokenConnexion({commit},token){
      commit('setTokenConnexion',token)
    }
  },
  modules: {},
});
