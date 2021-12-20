import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataShop:null
    // dataShop: {
    //   message: "Succès.",
    //   data: {
    //     id: 1,
    //     name: "La boutique de Sami De Molengeek",
    //     user_id: 1,
    //     created_at: "2021-11-04T12:01:05.000+01:00",
    //     updated_at: "2021-11-04T12:01:05.000+01:00",
    //     user: {
    //       id: 1,
    //       email: "admin@molengeek.com",
    //       created_at: "2021-11-04T12:01:05.000+01:00",
    //       updated_at: "2021-11-04T12:01:05.000+01:00",
    //     },
    //     products: [
    //       {
    //         id: 1,
    //         name: "Doritos Barbecue Style",
    //         description:
    //           "Doritos goût Barbecue. Maïs, huiles végétales (tournesol, colza, maïs, en proportion variable), base aromatisante barbecue [arôme (contient de la poudre d'oignon et de paprika), sucre, correcteurs d'acidité (diacétate de sodium, acide citrique), arôme de fumée], sel. Ce produit peut contenir du soja et du blé (gluten).",
    //         cover_path: "/images/doritos/barbecue_style.jpg",
    //         price: 1.59,
    //         shop_id: 1,
    //         created_at: "2021-11-04T12:01:05.000+01:00",
    //         updated_at: "2021-11-04T12:01:05.000+01:00",
    //       },
    //       {
    //         id: 2,
    //         name: "Doritos Dippers Guacamole",
    //         description:
    //           "Doritos à tremper goût guacamole. Maïs, huiles végétales (maïs, tournesol, colza en proportion variable), base aromatisante au goût de guacamole [poudre de petit-lait (contient du LAIT)), sel, arôme (contient du LAIT), chlorure de potassium, correcteur d'acidité (acide citrique), sucre, poudre d'oignon et de piment, poudre de tomate, colorants (complexes cuivriques de chlorophylles et de chlorophyllines)]. Ce produit peut contenir du soja et du blé (gluten).",
    //         cover_path: "/images/doritos/dippers_guacamole.png",
    //         price: 1.69,
    //         shop_id: 1,
    //         created_at: "2021-11-04T12:01:05.000+01:00",
    //         updated_at: "2021-11-04T12:01:05.000+01:00",
    //       },
    //       {
    //         id: 3,
    //         name: "Doritos Nacho Cheese",
    //         description:
    //           "Doritos goût fromage. Maïs, huiles végétales (tournesol, colza, maïs, en proportion variable), base aromatisante fromage [maltodextrine, poudre de petit-LAIT, farine de BLÉ (contient calcium, fer, niacine, thiamine), FROMAGE en poudre, poudre de tomate, arômes (dont LAIT), poudre d'oignon, poudre de BABEURRE, chlorure de potassium, exhausteur de goût (glutamate monosodique), protéines de LAIT, dextrose, correcteurs d'acidité (acide lactique, acide citrique), colorants (extrait de paprika, rocou bixine, caramel), épices, sucre, poudre de LAIT écrémé], sel. Ce produit peut contenir du soja.",
    //         cover_path: "/images/doritos/nacho_cheese.jpg",
    //         price: 1.79,
    //         shop_id: 1,
    //         created_at: "2021-11-04T12:01:05.000+01:00",
    //         updated_at: "2021-11-04T12:01:05.000+01:00",
    //       },
    //       {
    //         id: 4,
    //         name: "Doritos Dippers Naturel",
    //         description:
    //           "Doritos à tremper goût nature. Maïs, huiles végétales (tournesol, colza, maïs en proportion variable), sel. Ce produit peut contenir du soja et du blé (gluten).",
    //         cover_path: "/images/doritos/dippers_naturel.png",
    //         price: 1.65,
    //         shop_id: 1,
    //         created_at: "2021-11-04T12:01:05.000+01:00",
    //         updated_at: "2021-11-04T12:01:05.000+01:00",
    //       },
    //       {
    //         id: 5,
    //         name: "Doritos Flamin Hot",
    //         description:
    //           "Doritos goût piment. Maïs, huiles végétales (tournesol, colza, maïs en proportion variable), base aromatisante goût fromage épicé [arômes (dont LAIT, LACTOSE), perméat de petit-LAIT, sel, épices (paprika, poivre de cayenne, poivre blanc), poudre d'oignon, poudre d'ail, poudre de tomate, poudre de babeurre (LAIT), exhausteurs de goût (glutamate monosodique, 5'-ribonucléotide disodique), chlorure de potassium, correcteurs d'acidité (acide citrique, acide lactique), colorants (extrait de paprika, bixine de rocou, caramel), sucre, fromage en poudre (dont LAIT), poudre de petit-LAIT, LAIT demi-écremé en poudre, tréhalose~] ~tréhalose est une source de glucose. Ce produit peut contenir des traces du soja et du blé (gluten).",
    //         cover_path: "/images/doritos/flamin_hot.png",
    //         price: 1.85,
    //         shop_id: 1,
    //         created_at: "2021-11-04T12:01:05.000+01:00",
    //         updated_at: "2021-11-04T12:01:05.000+01:00",
    //       },
    //       {
    //         id: 6,
    //         name: "Doritos Pure Paprika",
    //         description:
    //           "Doritos goût paprika. Maïs, huiles végétales (tournesol, colza, maïs, en proportion variable), base aromatisante paprika [sucre, tomate en poudre, paprika en poudre, chapelure de BLÉ (contient calcium, fer, niacine, thiamine), oignon en poudre, protéine de SOJA hydrolysée, exhausteur de goût (glutamate monosodique), fructose, LACTOSE (de LAIT), BABEURRE en poudre, arôme, colorant (extrait de paprika), correcteurs d'acidité (acide citrique, acide malique)], sel.",
    //         cover_path: "/images/doritos/pure_paprika.jpg",
    //         price: 1.85,
    //         shop_id: 1,
    //         created_at: "2021-11-04T12:01:05.000+01:00",
    //         updated_at: "2021-11-04T12:01:05.000+01:00",
    //       },
    //       {
    //         id: 7,
    //         name: "Doritos Sweet Chilli Pepper",
    //         description:
    //           "Doritos goût chilli aux poivres. Maïs, huiles végétales (tournesol, colza, maïs, en proportion variable), base aromatisante piment doux [sucre, arôme (contient BLÉ et SOJA), protéines de SOJA hydrolysées, correcteur d'acidité (diacétate de sodium), exhausteurs de goût (glutamate monosodique, 5'-ribonucléotide disodique), extraits de piment, oignon en poudre, sel, ail en poudre, acidifiants (acide citrique et malique), chlorure de potassium, SOJA, BLÉ, colorant (extrait de paprika)].",
    //         cover_path: "/images/doritos/sweet_chilli_pepper.jpg",
    //         price: 1.85,
    //         shop_id: 1,
    //         created_at: "2021-11-04T12:01:05.000+01:00",
    //         updated_at: "2021-11-04T12:01:05.000+01:00",
    //       },
    //     ],
    //   },
    //   status: 200,
    //   error: {},
    // },
  },
  mutations: {
    setDataShop(state, dataShop){
      state.dataShop = dataShop;
    }
  },
  actions: {
    updateDataShop({commit},dataShop){
      commit('setDataShop',dataShop)
    }
  },
  modules: {},
});
