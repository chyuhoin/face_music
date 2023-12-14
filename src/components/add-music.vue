<template>
  <div class="add-music">
    <el-dialog title="添加音乐" :visible.sync="opened">
      <div class="id-input">
        <span style="margin-right: 50px;">音乐ID</span>
        <el-input v-model="id" placeholder="请输入音乐id" style="width: 30%;"></el-input>
      </div>
      <div class="block">
        <span>Anger</span>
        <el-slider v-model="anger" :show-tooltip="false" style="display: inline;"></el-slider>
      </div>
      <div class="block">
        <span>Disgust</span>
        <el-slider v-model="disgust" :show-tooltip="false"></el-slider>
      </div>
      <div class="block">
        <span>Fear</span>
        <el-slider v-model="fear" :show-tooltip="false"></el-slider>
      </div>
      <div class="block">
        <span>Happiness</span>
        <el-slider v-model="happiness" :show-tooltip="false"></el-slider>
      </div>
      <div class="block">
        <span>Neutral</span>
        <el-slider v-model="neutral" :show-tooltip="false"></el-slider>
      </div>
      <div class="block">
        <span>Sadness</span>
        <el-slider v-model="sadness" :show-tooltip="false"></el-slider>
      </div>
      <div class="block">
        <span>Surprise</span>
        <el-slider v-model="surprise" :show-tooltip="false"></el-slider>
      </div>
      <el-button @click="submit()">添加音乐</el-button>
    </el-dialog>
  </div>
</template>
  
<script>
import { myRequest, notify, createSong } from '@/utils'
import { confirm } from '@/base/confirm'
import { getSongDetail } from '@/api'
import SongTable from "@/components/song-table"

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: "",
      anger: 50,
      disgust: 50,
      fear: 50,
      happiness: 50,
      neutral: 50,
      sadness: 50,
      surprise: 50,
    }
  },
  methods: {
    async submit() {
      if (this.id === "") {
        confirm("请输入音乐ID！")
        return;
      }
      let total = this.anger + this.disgust + this.fear + this.happiness + this.neutral + this.sadness + this.surprise + 7;
      let emotion = {
        anger: (this.anger + 1) / total,
        disgust: (this.disgust + 1) / total,
        fear: (this.fear + 1) / total,
        happiness: (this.happiness + 1) / total,
        neutral: (this.neutral + 1) / total,
        sadness: (this.sadness + 1) / total,
        surprise: (this.surprise + 1) / total,
      }
      let detail = await getSongDetail(this.id);
      if (!detail.songs[0]) {
        confirm("找不到这样的歌！")
        return;
      }
      let resp = await myRequest.post('/add/music', {id: this.id, name: detail.songs[0].name, emotion: JSON.stringify(emotion), style: ""})
      if (resp.data.name) {
        notify.success(`音乐${resp.data.name}添加成功！`)
        this.id = ""
      }
      opened = false;
    }
  },
  mounted() {
    this.getSongData();
  },
  components: {
    SongTable
  }
}
</script>

<style lang="scss" scoped>
.id-input {
  display: inline;
  margin-bottom: 10px;
}
.block {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  display: flexbox;
}
</style>
  