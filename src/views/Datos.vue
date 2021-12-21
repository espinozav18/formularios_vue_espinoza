<template>
  <v-card>
    <v-card-title>
      <h3>Datos de registro</h3>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="listaItems"
        :items-per-page="5"
        class="elevation-1"
        :loading="'!=listaItems.length'"
        loading-text="Cargando...Por favor espere!"
      >
        <template v-slot:item.pais="{ item }">
          {{ listaPaises.find((element) => element.id === item.pais).pais }}
        </template>
        <template v-slot:item.documento="{ item }">
          {{ listaDocumento.find((element) => element.id === item.documento).doc }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
//const axios = require("axios");
export default {
  data() {
    return {
      //listaItems: [],
      headers: [
        { text: "Nombre", align: "start", sortable: false, value: "nombres" },
        { text: "Edad", value: "edad", filterable: false },
        { text: "email", value: "email", filterable: false },
        { text: "Pais", value: "pais", filterable: false },
        { text: "Documento", value: "documento", filterable: false },
        { text: "Comentario", value: "comentario", filterable: false },
      ],
     
    };
  },
  mounted() {
    this.$store.dispatch("obtenerRegistro");
  },
  computed: {
    ...mapState({ listaItems: (state) => state.listaRegistro }),
    ...mapState({ listaPaises: (state) => state.listaPaises }),
    ...mapState({ listaDocumento: (state) => state.listaDocumento }),
  },
  methods: {},
  filters: {
   
  },
};
</script>

<style lang="scss" scoped>
</style>