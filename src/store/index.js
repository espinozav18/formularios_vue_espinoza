import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const axios = require("axios");
export default new Vuex.Store({
  state: {
    listaRegistro: [],
    listaPaises: [
      {
        id: "A",
        pais: "Argentina",
      },
      {
        id: "B",
        pais: "Uruguay",
      },
      {
        id: "C",
        pais: "Perú",
      },
      {
        id: "D",
        pais: "Colombia",
      },
    ],
    listaDocumento: [
      {
        id: "dni",
        doc: "DNI",
      },
      {
        id: "pass",
        doc: "Pasaporte",
      },
      {
        id: "carnet",
        doc: "Carnet extranjeria",
      },
    ],
  },
  mutations: {
    LISTA_AGREGAR(state, payload) {
      state.listaRegistro=payload;

    }
  },
  actions: {
    obtenerRegistro(context) {
      //context.state.listaRegistro = [];
      axios.get(
        `https://61b75f4e64e4a10017d18ae0.mockapi.io/registrodesafio`
      ).then((rpta) => {

        if (rpta.status == 201 || rpta.status == 200) {
          context.commit("LISTA_AGREGAR", rpta.data);
        }
      }).catch((error) => {
        console.log(error.response.status + ": " + error.message);
      })
    }
  },
  modules: {
  }
})
