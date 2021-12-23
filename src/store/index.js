import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataShop:JSON.parse(localStorage.getItem('dataShop')),
    dataMonShop:JSON.parse(localStorage.getItem('dataMonShop')),
    tokenConnexion:localStorage.getItem('tokenConnexion'),
    profilUserConnected:localStorage.getItem('profilUserConnected')?JSON.parse(localStorage.getItem('profilUserConnected')):null

   
  },
  mutations: {
    setDataShop(state, dataShop){
      state.dataShop = dataShop;
    },
    setDataMonShop(state, dataShop){
      state.dataShop = dataShop;
    },
    setTokenConnexion(state, token){
      state.tokenConnexion = token;
    },
    setProfilUserConnected(state, profilUser){
      state.tokenConnexion = profilUser;
    }
  },
  actions: {
    updateDataShop({commit},dataShop){
      commit('setDataShop',dataShop)
    },
    updateDataMonShop({commit},dataShop){
      commit('setDataMonShop',dataShop)
    },
    updateTokenConnexion({commit},token){
      commit('setTokenConnexion',token)
    },
    updateProfilUserConnected({commit},profilUser){
      commit('setProfilUserConnected',profilUser)
    }
  },
  modules: {},
});
