
<template>
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

       <v-btn v-if="!this.loading"
              @click="SearchAPM(queryToText)"
              depressed
              color="primary"
       >
         Search
       </v-btn>


      <v-row>
        <v-checkbox v-model="loadAlbum" label="Load Album Picture"></v-checkbox>
        <v-checkbox v-model="ShowType" label="Show Music Type"></v-checkbox>
      </v-row>

      <v-progress-linear v-if="this.loading" indeterminate></v-progress-linear>
      <v-btn
          depressed
          color="primary"
          @click="downloadAll"
          v-if="list"
      >
        Download All
      </v-btn>

    </v-card>



<template v-for="(item,index) in list" :key="item.id">
  <br>
     <v-card    class="mx-auto"
                outlined>

         <v-list-item three-line>
           <v-list-item-content>
             <div class="text-overline mb-4">
               {{  index }} . {{  item.albumCode }}
             </div>
             <v-list-item-title class="text-h5 mb-1">
               {{  item.trackTitle }}
               <v-chip v-if="item.hasLyrics">
               Has Lyrics
               </v-chip>
               <v-chip class="ma-2"
                       color="primary"
                       outlined pill v-for="(item) in item.composer" :key="item">


                 {{item }}
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
         <v-btn  :href="item.audioUrl" >
           Download
         </v-btn>
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
</template>



<script>

export default  {
  name: 'APMLists',
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
    downloadAll(){
      this.dialog = true
      this.list.forEach((item) => {
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
    }
  },
  data() {
    return {
      drawer: true,
      currentPage: "",
      loading: this.loading,
      list: this.list,
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
