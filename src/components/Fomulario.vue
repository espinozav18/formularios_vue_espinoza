<template>
  <v-col cols="6">
    <v-card>
      <v-card-title>
        <h3>Registro de datos</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="datos.nombres"
            :rules="rulesDatos.nombres"
            label="Nombre completo"
            required
          ></v-text-field>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model.number="datos.edad"
                :rules="rulesDatos.edad"
                label="Edad"
                :type="'number'"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="datos.email"
                :rules="rulesDatos.email"
                label="E-mail"
                required
              ></v-text-field
            ></v-col>
          </v-row>

          <v-select
            v-model="datos.pais"
            :items="listaPaises"
            item-text="pais"
            item-value="id"
            :rules="rulesDatos.pais"
            label="Seleccione pais"
            required
          ></v-select>
          <v-radio-group
            v-model="datos.documento"
            row
            :rules="rulesDatos.documento"
          >
            <v-radio
              v-for="(doc, i) in listaDocumento"
              :key="i"
              :label="doc.doc"
              :value="doc.id"
            ></v-radio>
          </v-radio-group>
          <v-textarea
            v-model="datos.comentario"
            :rules="rulesDatos.comentario"
            label="Comentario"
            required
            rows="3"
            row-height="15"
          ></v-textarea>
          <v-alert
            dense
            text
            :type="mensaje.success ? 'success' : 'error'"
            v-model="alert"
          >
            {{ mensaje.mensaje }}
          </v-alert>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Guardar
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Limpiar </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
export default {
  name: "Formulario",
  data() {
    return {
      datos: {
        nombres: "",
        edad: "",
        email: "",
        lenguajes: [],
        pais: "",
        documento: "",
        comentario: "",
      },
      rulesDatos: {
        nombres: [(v) => !!v || "Requiere nombres"],
        edad: [(v) => !!v || "Requiere Edad"],
        email: [
          (v) => !!v || "Requiere Correo",
          (v) => /.+@.+\..+/.test(v) || "Correo invalido",
        ],
        lenguajes: [(v) => !!v || "Requiere Lenguahe"],
        pais: [(v) => !!v || "Requiere Pais"],
        documento: [(v) => !!v || "Requiere Documento"],
        comentario: [(v) => !!v || "Requiere Comentario"],
      },
      valid: true,
      

      mensaje: {},
      alert: null,
    };
  },
  mounted(){
    
  },
  computed:{
    ...mapState({ listaPaises: (state) => state.listaPaises }),
    ...mapState({ listaDocumento: (state) => state.listaDocumento }),
    
  },
  methods: {
    async validate() {
      this.alert = null;
      this.mensaje = {};
      let valid = this.$refs.form.validate();
      if (valid) {
        await axios
          .post(
            `https://61b75f4e64e4a10017d18ae0.mockapi.io/registrodesafio`,
            this.datos
          )
          .then((rpta) => {
            console.info(rpta);
            if (rpta.status == 201 || rpta.status == 200) {
              this.mensaje = { mensaje: "Registro exitosamete", success: true };
            } else {
              this.mensaje = { mensaje: "Error al registro", success: false };
            }
          })
          .catch((error) => {
            this.mensaje = {
              mensaje: error.response.status + ": " + error.message,
              success: false,
            };
          });
        this.alert = true;
      }
      this.$store.dispatch("obtenerRegistro");
       this.$refs.form.reset();
    },
    reset() {
      this.alert = false;
      this.mensaje = {};
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
label {
  margin-left: 0.5em !important;
}
</style>