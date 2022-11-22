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
    <br>
    <v-card title="JSON Builder">
      <!-- JSON builder Elements-->
      <v-container>
        <template v-for="(item,index) in objectGenareted.objects" :key="item">
          <v-expansion-panels>
            <v-expansion-panel
                :title="'Layer: ' + index"
            >
              <v-expansion-panel-text>

               <v-container>
                 <v-select label="Type" v-model="item.type" :items="type">

                 </v-select>
                 <v-card v-if="item.type == 'text'">
                   <v-text-field label="Text" v-model="item.text"></v-text-field>
                   <v-text-field label="Font" v-model="item.font"></v-text-field>
                   <v-text-field label="X" v-model="item.x"></v-text-field>
                   <v-text-field label="Y" v-model="item.y"></v-text-field>
                 </v-card>
                 <v-card v-if="item.type == 'images'">
                   <v-text-field label="X" v-model="item.x"></v-text-field>
                   <v-text-field label="Y" v-model="item.y"></v-text-field>
                   <v-text-field label="Width" v-model="item.width"></v-text-field>
                   <v-text-field label="Height" v-model="item.height"></v-text-field>
                   <v-text-field label="ImageLink" v-model="item.url"></v-text-field>
                 </v-card>
               </v-container>
                <v-card-actions>
                  <v-btn @click="deleteObject(index)">Remove</v-btn>
                </v-card-actions>


              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>


        </template>
      </v-container>
      <!-- JSON builder Elements-->
      <v-card-actions>
        <v-btn @click="addObject()">Add Object</v-btn>
        <v-btn @click="exportJSON()">Export To JSON</v-btn>

      </v-card-actions>
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
      type: ["text","images"],
     json: "",
      error: "",
      src: "",
      objectGenareted: {
        useDataURL: true,
        x: 400,
        y: 400,
       objects: [
         
       ]
      }
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
    },
    deleteObject(index) {
      this.objectGenareted.objects.pop(index)
    },
    addObject(){

      this.objectGenareted.objects.push({
        type: "text",
        text: "Hello World",
        x: 0,
        y: 0,
        font: "20px Roboto",
        url: "",
        width: 0,
        height: 0
      })
    },
    exportJSON(){
     this.json =  JSON.stringify(this.objectGenareted)
    }
  }
}
</script>

