<template>
  <v-app-bar color="teal">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>MeTooIDK <b>{{ title }}</b></v-toolbar-title>
    <v-btn @click="toggleTheme" prepend-icon="mdi-brightness-6"></v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <v-list density="compact" v-model="currentPage" :active-color="color"
            variant="plain"  nav>
      <v-list-item prepend-icon="mdi-home" @click="currentPage == 'home' ? ((currentPage = 'home' ),(title = 'Tools')): ((currentPage = 'home'),(title = 'Tools'));" title="Homes" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-equalizer" @click="currentPage == 'apm' ? ((currentPage = 'home'),(title = 'Tools')) : ((currentPage = 'apm',(title = 'MusicLibrary')));" title="APM Music" value="apm"></v-list-item>
      <v-list-item prepend-icon="mdi-robot" @click="currentPage == 'message' ? (( currentPage = 'home' ) , ( title = 'Tools')) : ((currentPage = 'message'),(title = 'AI Lab'));" title="Chat Bot" value="cb"></v-list-item>
      <v-list-item prepend-icon="mdi-robot" @click="currentPage == 'message' ? (( currentPage = 'home' ) , ( title = 'Tools')) : ((currentPage = 'img'),(title = 'APILab'));" title="Image Proccess API" value="imgproc"></v-list-item>
      <v-list-item prepend-icon="mdi-help" @click="currentPage == 'about' ? (( currentPage = 'home' ) , ( title = 'Tools')) : ((currentPage = 'about'),(title = 'About'));" title="About" value="about"></v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>
<script>
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
  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  }
}
</script>
