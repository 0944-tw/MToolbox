<template>

  <div id="app">
    <v-app>
      <v-app-bar color="teal">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>MeTooIDK <b>Tools</b></v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
        <v-list density="compact" v-model="currentPage" nav>
          <v-list-item prepend-icon="mdi-folder" @click="currentPage == 'home' ? currentPage = 'home' : currentPage = 'home';" title="Homes" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-equalizer" @click="currentPage == 'apm' ? currentPage = 'home' : currentPage = 'apm';" title="APM Music" value="apm"></v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container v-if="currentPage == 'home'">
          <v-card title="Welcome to MeTooIDK Tools" text="Because im lazy to download music so i created this.">
          </v-card>
        </v-container>
        <v-container v-if="currentPage == 'apm'">
          <apm></apm>
        </v-container>
      </v-main>
    </v-app>
  </div>

</template>

<script>
import apm from './apm.vue';
export default {
  name: 'LandingPage',
  data(){
    return {
      drawer: true,
      currentPage: "home"
    }
  },
  components: {
  apm
  },
  methods: {
    async searchAPM(query){
      console.log(query);
    }


  }
}
</script>

