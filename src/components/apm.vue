
<template>

 <v-layout title="MusicLibrary Beta" current-page="apm">

   <template>
     <div class="text-center">
       <v-dialog
           v-model="dialog"
       >
         <template v-slot:activator="{ props }">
           <v-btn
               color="primary"
               v-bind="props"
           >
             Open Dialog
           </v-btn>
         </template>

         <v-card>
           <v-card-text>
             You Need Alow Pop-Up On This Website if you wanna download more then 2 songs at same time.
           </v-card-text>
           <v-card-actions>
             <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
           </v-card-actions>
         </v-card>
       </v-dialog>
     </div>
   </template>
   <!-- Track -->
   <template>
     <v-dialog
         v-model="toggleAT"
         :scrim="false"

     >
       <v-card v-if="!albumTracks"
               color="primary"
       >
         <v-card-text>
           Fetching Audio...
           <v-progress-linear
               indeterminate
               color="white"
               class="mb-0"
           ></v-progress-linear>
         </v-card-text>
       </v-card>
       <!-- -->

       <v-card v-if="albumTracks">


         <v-card-text>
           <v-btn @click="downloadAll(albumTracks)">
             Download All
           </v-btn>
           <v-container fluid>
             <v-row dense>

               <v-col
                   v-for="(item) in albumTracks" :key="item.id" cols="6"
               >

                 <v-card>
                   <v-img
                       :src="item.albumArtLargeUrl"
                       class="align-end"
                       gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                       height="200px"
                       cover
                   >
                     <v-card-title class="text-white" v-text="item.trackTitle"></v-card-title>
                   </v-img>
                   <v-card-subtitle>
                     {{ item.description}}

                   </v-card-subtitle>
                   <v-card-actions>
                     <audio controls>
                       <source  :src="item.audioUrl" type="audio/mpeg">
                       Your browser does not support the audio element.
                     </audio>
                     <v-spacer></v-spacer>

                     <v-btn size="small" color="surface-variant" :href="item.audioUrl" variant="text" icon="mdi-download"></v-btn>


                   </v-card-actions>
                 </v-card>

               </v-col>
               <br>

             </v-row>
           </v-container>

         </v-card-text>
         <v-card-actions>
           <v-btn color="primary" block @click="toggleAT = false">Done</v-btn>
         </v-card-actions>
       </v-card>

     </v-dialog>
   </template>
   <!-- -->
   <v-alert color="error" v-if="errorMessages" icon="$error">
     {{ errorMessages }}
   </v-alert>
   <v-alert color="info" v-if="infoMessages" icon="$info">
     {{ infoMessages }}
   </v-alert>
   <v-card title="APM Searcher" text="Search & Download Music From APM Music.">
     <v-text-field v-model="queryToText"
                   label="Type Something There (Album/Name/Category)"
                   placeholder="Song Name"
                   outlined
     ></v-text-field>
     <v-card-actions>
       <v-btn v-if="!this.loading"
              @click="SearchAPM(queryToText)"
              depressed
              color="primary"
       >
         Search
       </v-btn>



       <v-btn
           depressed
           color="primary"
           @click="downloadAll(list)"
           v-if="list"
       >
         Download All
       </v-btn>
     </v-card-actions>




     <v-progress-linear v-if="this.loading" indeterminate></v-progress-linear>


   </v-card>


   <v-row>
     <v-checkbox v-model="loadAlbum" label="Load Album Picture"></v-checkbox>
     <v-checkbox v-model="ShowType" label="Show Music Type"></v-checkbox>
   </v-row>
   <template v-for="(item,index) in list" :key="item.id">
     <br>
     <v-card    class="mx-auto"
                outlined>

       <v-list-item three-line>
         <v-list-item-content>
           <div class="text-overline mb-4">
             {{  index }} . <a @click="fetchAlbum(item.albumCode)">{{  item.albumCode }} (Click to View Album Tracks)</a>
           </div>
           <v-list-item-title class="text-h5 mb-1">
             {{  item.trackTitle }}
             <v-chip v-if="item.hasLyrics">
               Has Lyrics
             </v-chip>

             <v-chip class="ma-2"
                     color="primary" >
               Composers
               <v-tooltip
                   activator="parent"
                   location="start"
               >{{item.composer.join(',') }}</v-tooltip>


               <v-icon left>
                 mdi-account-outline
               </v-icon>
             </v-chip>
             <!--Vue Chip - Composer -->

           </v-list-item-title>
           <v-list-item-subtitle>{{  item.description }}

             <template v-if="ShowType">

               <v-chip  class="ma-2" pill v-for="(item) in item.terms " :key="item">


                 {{item.value }}
               </v-chip>
             </template>
             <!--Vue Chip - Type -->

           </v-list-item-subtitle>
         </v-list-item-content>

         <v-list-item-avatar
             tile
             size="80"
             color="grey"
         ></v-list-item-avatar>
         <v-avatar
             class="ma-3"
             size="125"
             rounded="0"
             v-if="loadAlbum"
         >
           <v-img :src="item.albumArtLargeUrl"></v-img>
         </v-avatar>
       </v-list-item>

       <v-card-actions>

         <v-card-actions>
           <v-btn
               class="ml-2"
               icon="mdi-download"
               variant="text"
               :href="item.audioUrl"
           ></v-btn>
         </v-card-actions>

         <audio controls>
           <source  :src="item.audioUrl" type="audio/mpeg">
           Your browser does not support the audio element.
         </audio>
       </v-card-actions>
       <v-expansion-panels @click="fetchLyrics(item.id)" v-if="item.hasLyrics">
         <v-expansion-panel
             title="Lyrics"

             :text="lyrics"
         >
         </v-expansion-panel>
       </v-expansion-panels>
     </v-card>
   </template>
 </v-layout>
</template>


<script>
import vLayout from './layout'
export default  {
  name: 'APMLists',
  components: {
    vLayout
  },
  methods: {

    async SearchAPM(query){
      this.infoMessages = ""
      this.errorMessages = ""
      this.loading = true
      let encoded = encodeURIComponent(query)
      console.log(encoded)
      this.axios({
        method: 'post',
        url: 'https://api.apmmusic.com/search/tracks',
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": "BASNjbQeR0ibnmamJ1UE1xF3iL2UNRI6Za-5FYBeQyA",
          "x-sundrop-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidHlwZSI6ImNvbXBvc2l0ZSIsImZpZWxkIjoidXNlcmluZm8iLCJ2YWx1ZSI6W3sidHlwZSI6InRleHQiLCJ2YWx1ZSI6IjAiLCJmaWVsZCI6InVzZXJpZCIsIm9wZXJhdGlvbiI6ImluY2x1ZGUifV0sIm9wZXJhdGlvbiI6ImluY2x1ZGUifSx7InR5cGUiOiJ0YWciLCJ2YWx1ZSI6IlVTIiwiZmllbGQiOlsicmVzdHJpY3RlZF90byJdLCJvcGVyYXRpb24iOiJtdXN0In1d.N4wYVgW8VnoKSZApYYjGqS2T3Tud_f4oHDCcKrBqPqg",
        },
        data: `{"limit":25,"offset":0,"sort":"relevancy_base","terms":[{"type":"text","field":["tags","track_title","track_description","album_title","album_description","sound_alikes","lyrics","library","composer"],"value":"${query}","operation":"must"}]}`
      }).then((res) => {

        console.log(res);
        this.infoMessages = "Search Completed"

        this.loading = false
        this.list = res.data.rows
        if (res.data.rows.length == 0){
          this.infoMessages = "No Results Found"
        }

      }).catch((err) => {
        console.log(err);
        this.loading = false
        this.errorMessages = err
      })
    },
    downloadAll(list){
      this.dialog = true
      list.forEach((item) => {
        window.open(item.audioUrl, '_blank');
      })
      /*
      var tempLink = document.createElement('a');
      document.body.appendChild(tempLink);
      for (let i = 0; i < this.list.length; i++) {
        const element = this.list[i];
        console.log(element.audioUrl)
        let fileUrl = element.audioUrl
        tempLink.setAttribute('href', fileUrl);
        tempLink.setAttribute('download', fileUrl.split('/')[fileUrl.split('/').length*1-1*1]);
        tempLink.click();

      }
      */
    },
    fetchLyrics(id){
      this.loading = true
      this.errorMessages = ""
      this.axios({
        url: `https://api.apmmusic.com/search/tracks/${id}/lyrics`
      }).then((res) => {
        this.lyrics = res.data
        console.log(res);
        this.loading = false
      }).catch((err) => {
        this.lyrics = "<b>Error While Loading Lyrics</b>"
        this.errorMessages = "Cannot Load Lyrics! Maybe Because CORS? Try Again Later."
        this.loading = false
        console.log(err);
      })
    },
    fetchAlbum(album){
      this.toggleAT = true
      this.albumTracks = undefined
      let link = `https://api.apmmusic.com/search/albums/${album}/tracks`
      this.axios({
        url: link,
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": "BASNjbQeR0ibnmamJ1UE1xF3iL2UNRI6Za-5FYBeQyA",
          "x-sundrop-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.W3sidHlwZSI6ImNvbXBvc2l0ZSIsImZpZWxkIjoidXNlcmluZm8iLCJ2YWx1ZSI6W3sidHlwZSI6InRleHQiLCJ2YWx1ZSI6IjAiLCJmaWVsZCI6InVzZXJpZCIsIm9wZXJhdGlvbiI6ImluY2x1ZGUifV0sIm9wZXJhdGlvbiI6ImluY2x1ZGUifSx7InR5cGUiOiJ0YWciLCJ2YWx1ZSI6IlVTIiwiZmllbGQiOlsicmVzdHJpY3RlZF90byJdLCJvcGVyYXRpb24iOiJtdXN0In1d.N4wYVgW8VnoKSZApYYjGqS2T3Tud_f4oHDCcKrBqPqg",
        }
      }).then((res) => {
        console.log(res);
        this.albumTracks = res.data
      }).catch((err) => {
        this.toggleAT = false
        console.log(err);
      })
    }
  },
  data() {
    return {
      drawer: true,
      currentPage: "",
      loading: this.loading,
      list: this.list,
      albumTracks: this.albumTracks,
      toggleAT: false,
      queryToText: "",
      errorMessages: "",
      infoMessages: "",
      loadAlbum: false,
      ShowType: false,
      dialog: false,
      lyrics: ""
    }
  },
}
</script>
