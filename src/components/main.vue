<template>

  <div id="app">
    <v-app>
      <v-app-bar color="teal">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>MeTooIDK <b>{{ title }}</b></v-toolbar-title>
        <v-btn @click="toggleTheme">Theme</v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
        <v-list density="compact" v-model="currentPage" :active-color="color"
                variant="plain"  nav>
          <v-list-item prepend-icon="mdi-home" @click="currentPage == 'home' ? ((currentPage = 'home' ),(title = 'Tools')): ((currentPage = 'home'),(title = 'Tools'));" title="Homes" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-equalizer" @click="currentPage == 'apm' ? ((currentPage = 'home'),(title = 'Tools')) : ((currentPage = 'apm',(title = 'MusicLibrary')));" title="APM Music" value="apm"></v-list-item>
          <v-list-item prepend-icon="mdi-info" @click="currentPage == 'message' ? (( currentPage = 'home' ) , ( title = 'Tools')) : ((currentPage = 'message'),(title = 'AI Lab'));" title="Chat Bot" value="cb"></v-list-item>
          <v-list-item prepend-icon="mdi-question" @click="currentPage == 'about' ? (( currentPage = 'home' ) , ( title = 'Tools')) : ((currentPage = 'about'),(title = 'About'));" title="About" value="cb"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container v-if="currentPage == 'home'">
          <v-card title="Welcome to MeTooIDK Tools" text="Because im lazy to download music so i created this.">

          </v-card>

        </v-container>
        <v-container  v-if="currentPage == 'apm'">
          <apm></apm>
        </v-container>
        <v-container  v-if="currentPage == 'about'">
          <about></about>
        </v-container>
      </v-main>
    </v-app>
  </div>

</template>

<script>
import apm from './apm.vue';
import about from './about.vue';
import { useTheme} from 'vuetify';
export default {
  name: 'LandingPage',
  data(){
    return {
      drawer: true,
      currentPage: "home",
      title: "Tools",
      color: "teal"
    }
  },
  components: {
  apm,
    about
  },
  methods: {
    async searchAPM(query) {
      console.log(query);
    }


  },
  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  }
}
</script>

