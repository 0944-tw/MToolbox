
<template>
  <Layout></Layout>

</template>

<script>
import Layout from './components/main.vue';
export default {
  name: 'App',
  components:{
    Layout
  },
  data() {
    return {
      drawer: true,
      currentPage: ""
    }
  }
}
</script>
