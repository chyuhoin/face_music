<template>
  <div class="admin-music">
    <AddMusic :opened="openAddDialog" @close="closeAdd"/>
    <EditMusic :opened="openEditDialog" @close="closeEdit"/>
    <div class = "bu1">
    <el-button type="success"  @click="addMusic()">添加音乐</el-button>
    <el-button type="danger" @click="editMusic()">编辑音乐</el-button>
    </div>
    <SongTable
      :songs="songs"
      header-row-class-name="header-row"
      style = "margin-top:10px"
    />
  </div>
</template>

<script>
import { myRequest, createSong } from '@/utils'
import { getSongDetail } from '@/api'
import SongTable from "@/components/song-table"
import AddMusic from "@/components/add-music"
import EditMusic from "@/components/edit-music"

export default {
data() {
  return {
    songs: [],
    openAddDialog: false,
    openEditDialog: false
  }
},
methods: {
  addMusic() {
    this.openAddDialog = true;
  },
  editMusic() {
    this.openEditDialog = true;
  },
  closeAdd() {
    this.openAddDialog = false;
    this.getSongData();
  },
  closeEdit() {
    this.openEditDialog = false;
    this.getSongData();
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
  AddMusic,
  EditMusic
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

.bu1 {
display: flex;
justify-content: center;
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
