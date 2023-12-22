<template>
    <div class="admin-music">
      <AddMusic :opened="openDialog" @close="closeAdd"/>
      <el-button @click="addMusic()">添加音乐</el-button>
      <SongTable
        :songs="songs"
        header-row-class-name="header-row"
      />
    </div>
  </template>
  
<script>
import { myRequest, createSong } from '@/utils'
import { getSongDetail } from '@/api'
import SongTable from "@/components/song-table"
import AddMusic from "@/components/add-music"

export default {
  data() {
    return {
      songs: [],
      openDialog: false
    }
  },
  methods: {
    addMusic() {
      this.openDialog = true;
    },
    closeAdd() {
      this.openDialog = false;
    },
    async getSongData() {
      let resp = await myRequest.get('/musicIds');
      let ids = resp.data.ids;
      let { songs } = await getSongDetail(ids);
      this.songs = songs.map(song => {
        const {
          id,
          name,
          ar: artists,
          dt: duration,
          mv,
          al: { picUrl, name: albumName }
        } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          albumName,
          img: picUrl,
          mvId: mv
        })
      })
    }
  },
  mounted() {
    this.getSongData();
  },
  components: {
    SongTable,
    AddMusic
  }
}
</script>

<style lang="scss" scoped>
.admin-music {
  padding: 12px;
  max-width: 50%;
  margin: auto;
  .header-row {
    display: none;
  }
}
// .id-input {
//   display: inline;
//   margin-bottom: 10px;
// }
// .block {
//   width: 30%;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 40px;
//   display: flexbox;
// }
</style>
  