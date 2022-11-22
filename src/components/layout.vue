<template>
  <div id="app">
    <v-app>
      <v-app-bar color="teal">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>MeTooIDK <b>{{ title || "Toolbox" }}</b></v-toolbar-title>
        <v-btn @click="toggleTheme" prepend-icon="mdi-brightness-6"></v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer">
        <v-list density="compact" :v-model="currentPage" :active-color="color"
                variant="plain"  nav>
          <v-list-item prepend-icon="mdi-home" @click="$router.push('/home')" title="Homes" value="home"></v-list-item>
          <v-list-item @click="$router.push('/apm')" prepend-icon="mdi-equalizer" title="APM Music" value="apm"></v-list-item>
          <v-list-item  @click="$router.push('/imgproc')" prepend-icon="mdi-robot" title="Image Proccess API" value="imgproc"></v-list-item>
          <v-list-item  @click="$router.push('/about')" prepend-icon="mdi-help"  title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-app>
    <v-container/>
  </div>

</template>

<script>
import { useTheme} from 'vuetify';
export default {
  props: ['currentPage','title'],

  name: 'LandingPage',
  data(){
    return {
      drawer: true,
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
