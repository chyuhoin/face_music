<template>
  <div class="feedback-table">
    <p>用户反馈表</p>
    <el-table
      :data="feedback"
    >
      <el-table-column
        prop="score"
        label="分数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="feedback"
        label="反馈"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { myRequest } from "@/utils";

export default {
  data() {
    return {
      feedback: [],
    };
  },
  methods: {
    async getData() {
      let resp = await myRequest.get("/feedbackList");
      this.feedback = resp.data;
      return resp.data;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>

</style>
