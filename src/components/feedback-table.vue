<template>
  <div class="feedback-table">
    <p style="font-size: 20px; margin-top:10px; margin-bottom:10px; font-weight: bold;text-align: center">用户反馈表</p>
    <div class="container">
      <div class="table">
        <el-table :data="feedback">
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
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>

<script>
import { myRequest } from "@/utils";

export default {
  data() {
    return {
      feedback: [],
      cnt: []
    };
  },
  methods: {
    async getData() {
      let resp = await myRequest.get("/feedbackList");
      this.feedback = resp.data;
      this.cnt = [0, 0, 0, 0, 0, 0];
      this.feedback.forEach(item => {this.cnt[item.score] += 1;})
      setTimeout(this.initChart, 500);
      return resp.data;
    },
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          selectedMode: false
        },
        series: [
          {
            name: '用户反馈评分统计',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start angle
            startAngle: 180,
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + ' (' + param.percent * 2 + '%)';
              }
            },
            data: [
              { value: this.cnt[0], name: '0分' },
              { value: this.cnt[1], name: '1分' },
              { value: this.cnt[2], name: '2分' },
              { value: this.cnt[3], name: '3分' },
              { value: this.cnt[4], name: '4分' },
              { value: this.cnt[5], name: '5分' },
              {
                // make an record to fill the bottom 50%
                value: this.cnt[0] + this.cnt[1] + this.cnt[2] + this.cnt[3] + this.cnt[4] + this.cnt[5],
                itemStyle: {
                  // stop the chart from rendering this piece
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.chart {
  width: 500px;
  height: 600px;
}
.table {
  margin: 30px;
  display: flex;
}
</style>
