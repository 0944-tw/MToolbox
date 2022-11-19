
<template>

    <v-card title="APM Searcher" text="Search & Download Music From APM Music.">
      <v-text-field v-model="queryToText"
          label="Type Something There"
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
      <v-progress-linear v-if="this.loading" indeterminate></v-progress-linear>
    </v-card>
     <v-card    class="mx-auto"
                outlined v-for="(item,index) in list" :key="item.trackTitle">

         <v-list-item three-line>
           <v-list-item-content>
             <div class="text-overline mb-4">
               {{  index }} . {{  item.albumCode }}
             </div>
             <v-list-item-title class="text-h5 mb-1">
               {{  item.trackTitle }}
             </v-list-item-title>
             <v-list-item-subtitle>{{  item.description }}</v-list-item-subtitle>
           </v-list-item-content>

           <v-list-item-avatar
               tile
               size="80"
               color="grey"
           ></v-list-item-avatar>
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
       </v-card>
</template>



<script>

export default  {
  name: 'APMLists',
  methods: {

    async SearchAPM(query){
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
            this.loading = false
            this.list = res.data.rows
          }).catch((err) => {
            console.log(err);
            this.loading = false

          })
    }
  },
  data() {
    return {
      drawer: true,
      currentPage: "",
      loading: this.loading,
      list: this.list,
      queryToText: ""
    }
  },
}
</script>
