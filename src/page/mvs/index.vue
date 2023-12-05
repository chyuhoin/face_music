<template>
  <div class="feedback">
    <span>综合打分</span>
    <el-rate class="rate"
      v-model="rating"
      :colors="colors"
      show-text>
    </el-rate>
    
    <span>反馈</span>
    <el-input type="textarea" v-model="words" class="longtxt" :rows="10"></el-input>
    <el-button class="submit-btn" @click="onSubmit()">提交</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { notify, myRequest, isDef } from '@/utils'

export default {
  created() {
    
  },
  data() {
    return {
      words: "",
      rating: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods: {
    async onSubmit() {
      if (this.rating === 0 || !isDef(this.rating)) {
        notify.error('请先打分');
        return;
      }

      let resp = await myRequest.post('/add/feedback', {
        'score': this.rating,
        'feedback': this.words
      })
      if (isDef(resp.data.message)) {
        notify.error(`出现错误：${resp.data.message}`);
      } else {
        this.words = "";
        this.rating = null;
        notify.success('反馈成功')
      }
    }
  },
  computed: {
    
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
>>> .el-rate__icon{
  font-size: 350px;
}

.feedback {
  padding: 20px;
}

.rate {
  margin-top: 1%;
  margin-bottom: 2%;
}

.longtxt {
  margin-top: 1%;
  height: max-content;
}

.submit-btn {
  margin-top: 3%;
}
</style>
