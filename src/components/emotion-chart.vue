<template>
  <div class="emotion-chart">
    <p>七维情感统计</p>
    <div class="chart" ref="emotionChart"></div>
  </div>
</template>

<script>
import { myRequest } from '@/utils'

export default {
  data() {
    return {
      emotionData: null,
      emotionChart: null
    }
  },
  methods: {
    init() {
      this.emotionChart = this.$echarts.init(this.$refs.emotionChart);
      let option = {
        tooltip: {
        trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.emotionData.anger, name: 'anger' },
              { value: this.emotionData.disgust, name: 'disgust' },
              { value: this.emotionData.fear, name: 'fear' },
              { value: this.emotionData.happiness, name: 'happiness' },
              { value: this.emotionData.neutral, name: 'neutral' },
              { value: this.emotionData.sadness, name: 'sadness' },
              { value: this.emotionData.surprise, name: 'surprise' },
            ]
          }
        ]
      };
      this.emotionChart.setOption(option)
    },
    async getData() {
      let resp = await myRequest.get('/face/data');
      this.emotionData = resp.data;
      return resp.data;
    }
  },
  mounted() {
    this.getData().then(() => {
      setTimeout(this.init, 500);
    })
  }
}
</script>
  
<style lang="scss" scoped>
.chart {
  width: 300px;
  height: 400px;
}
</style>
  