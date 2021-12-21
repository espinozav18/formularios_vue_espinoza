<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app expand-on-hover>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="./assets/logo.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-title class="text-h6">
            Bienvenido Coder
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Formulario con Axios
            </v-list-item-title>
            <v-list-item-subtitle>router y vuex</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list-item-group v-model="selectedItem">
        <v-list nav dense>
          <v-list-item link>
           
            <v-list-item-title
              ><router-link class="a-text" to="/"
                > <v-icon>mdi-home </v-icon> Registro</router-link
              ></v-list-item-title
            >
          </v-list-item>
          <v-list-item link>
            <v-list-item-title
              > <router-link class="a-text" to="/datos"
                > <v-icon>mdi-eye</v-icon> Ver datos</router-link
              ></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <!--<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>-->

      <v-toolbar-title
        >DESAFÍO COMPLEMENTARIO Vuex en vue
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: null, selectedItem: 0 }),
  computed:{
  
  }
};
</script>
<style scoped>
.a-text {
  text-decoration: none;
}
</style>