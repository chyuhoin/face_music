<template>
  <div class="add-music">
    <el-dialog width="400px" title="编辑音乐" :visible.sync="opened" @close="closeDialog">
      <div class="id-input" style="margin-bottom: 30px;">
        <span style="margin-right: 50px;">音乐名</span>
        <el-input
          @click.native="onClickInput"
          @input="onInput"
          placeholder="输入音乐名进行搜索"
          prefix-icon="el-icon-search"
          ref="input"
          v-model.trim="searchKeyword"
          style="width: 50%;"
        ></el-input>
        <div v-if="searchPanelShow">
          <div
            :key="index"
            class="suggest-item"
            v-for="(normalizedSuggest, index) in normalizedSuggests"
          >
            <ul class="list">
              <li
                :key="item.id"
                @click="normalizedSuggest.onClick(item)"
                class="item"
                v-for="item in normalizedSuggest.data"
              >
                <HighlightText
                  :highlightText="searchKeyword"
                  :text="item.name"
                />
              </li>
            </ul>
          </div>
        </div>
        <p style="margin-top: 20px;">
          音乐ID
          <span style="margin-left: 50px;">{{ id }}</span>
        </p>
      </div>

      <span style="margin-top: 50px;">音乐情感</span>
      <div class="emotion" v-for="(e, index) in emotionList" :key="index">
        <ul>
          <li style="margin-top: 10px;">
            <span style="display:inline-block; width:90px; text-align:right;">{{ e.tp }}</span>
            <el-input maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="e.val" style="width: 25%; margin-left: 20px; text-align:center;"></el-input>
          </li>
        </ul>
      </div>
      <div class = "b2">
        <el-button @click="submit()" type="success">保存修改</el-button>
        <el-button @click="remove()" type="danger">删除音乐</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import { myRequest, notify, debounce } from '@/utils'
import { confirm } from '@/base/confirm'
import { getSongDetail } from '@/api'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchKeyword: "",
      suggest: {},
      searchPanelShow: false,
      id: "",
      emotionList: [
        {tp: "anger", val: 0},
        {tp: "disgust", val: 0},
        {tp: "fear", val: 0},
        {tp: "happiness", val: 0},
        {tp: "neutral", val: 0},
        {tp: "sadness", val: 0},
        {tp: "surprise", val: 0},
        
      ]
    }
  },
  methods: {
    onClickInput() {
      this.searchPanelShow = true
    },
    onBlur() {
      this.searchPanelShow = false
    },
    onInput: debounce(function(value) {
      if (!value.trim()) {
        return
      }
      myRequest.get('/musicSearch/' + value).then(resp => {
        this.suggest = resp.data;
      })
    }, 500),
    onClickSong(item) {
      this.id = item.id;
      this.searchKeyword = item.name;
      for (let i = 0; i < 7; i++) {
        this.emotionList[i].val = Math.round(item.emotion[i] * 100);
      }
      this.searchPanelShow = false;
    },
    async submit() {
      if (this.id === "") {
        confirm("请输入音乐ID！")
        return;
      }

      let emotionVal = this.emotionList.map(e => parseInt(e.val) + 1);
      let total = emotionVal.reduce((sum, now) => sum + now);
      
      let emotion = {
        anger: emotionVal[0] / total,
        disgust: emotionVal[1] / total,
        fear: emotionVal[2] / total,
        happiness: emotionVal[3] / total,
        neutral: emotionVal[4] / total,
        sadness: emotionVal[5] / total,
        surprise: emotionVal[6] / total,
      }
      let detail = await getSongDetail(this.id);
      if (!detail.songs[0]) {
        confirm("找不到这样的歌！")
        return;
      }
      let resp = await myRequest.put('/music/' + this.id, {id: this.id, name: detail.songs[0].name, emotion: JSON.stringify(emotion), style: ""})
      if (resp.data.name) {
        notify.success(`音乐${resp.data.name}修改成功！`)
        this.id = ""
        this.searchKeyword = ""
        this.emotionList.forEach(e => e.val = 0);
        this.suggest = {};
      }
      this.$emit('close');
    },
    closeDialog() {
      this.$emit('close');
    },
    remove() {
      if (this.id === "") {
        confirm("请输入音乐ID！")
        return;
      }

      confirm(`是否删除歌曲${this.searchKeyword}？`, () => {
        myRequest.delete('/music/' + this.id).then(() => {
          notify.success(`音乐删除成功！`);
          this.id = ""
          this.searchKeyword = ""
          this.emotionList.forEach(e => e.val = 0);
          this.suggest = {};
          this.$emit('close');
        })
      });
    }
  },
  mounted() {
  },
  computed: {
    normalizedSuggests() {
      return [
        {
          title: "单曲",
          icon: "music",
          data: this.suggest,
          onClick: this.onClickSong.bind(this)
        }
      ].filter(item => item.data && item.data.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.b2{
  margin-top: 20px;
  display: flex;
  justify-content: center;

}
.suggest-item {
  position: fixed;
  right: auto;
  width: 350px;
  background: var(--search-bgcolor);
  z-index: $search-panel-z-index;
  font-size: $font-size-sm;
  overflow-y: auto;
  @include box-shadow;
  margin-bottom: 16px;

  .list {
      .item {
        padding: 12px 24px;
        cursor: pointer;
        @include text-ellipsis();

        &:hover {
          background: var(--light-bgcolor);
        }
      }
    }
}
</style>
  