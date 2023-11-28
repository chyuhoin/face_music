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
  </div>
</template>

<script type="text/ecmascript-6">

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
    onSubmit() {
      //console.log('submit!');
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
  font-size: 35px;
}

.feedback {
  padding: 20px;
}

.longtxt {
  height: max-content;
}
</style>
