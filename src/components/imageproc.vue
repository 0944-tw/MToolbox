<template>
  <layout title="IMGLab">
  <v-alert v-if="error" color="error" icon="$error">
    {{  error}}
  </v-alert>
  <v-card title="Image Proccess API" subtitle="Image Process API. Modify Your Images Online">
    <v-textarea v-model="json" label="IMGProc JSON" placeholder="JSON Here"></v-textarea>
    <v-card-actions>
      <v-btn @click="submitAPI">Submit</v-btn>
    </v-card-actions>
  </v-card>
  <br>
  <v-card title="Docs" subtitle="Go to : https://github.com/ImLoadingUuU/MToolbox/wiki/IMGProc-JSON">

  </v-card>
<img :src="src">
  </layout>
</template>
<script>
import Layout from './layout'
export default {
  name: 'ImageProcAPI',
  data(){
    return {
     json: "",
      error: "",
      src: ""
    }
  },
  components: {
  Layout
  },
  methods: {
    submitAPI() {
      console.log("Submitted");
      console.log(this.json)
      this.error = ""
      this.axios({
        method: "POST",
        url: "https://MToolboxAPI.imloading.repl.co/customImage",
        headers: {
           "Content-Type": "application/json"
        },

        data: this.json
      }).then((res) => {
        console.log(res)
        this.src = res.data
      }).catch((err) => {
        this.error = err
        console.log(err);
      })
    }
  }
}
</script>

