<template>

  <v-layout title="Home" current-page="home">
    <v-card title="Switching to Vue Router.">
    </v-card>
  </v-layout>

</template>

<script>
import vLayout from './layout'
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
  components:{
    vLayout
  }
}
</script>

