<template>
  <div class="emotion-chart" style="margin-bottom: 80px;">
    <p>七维情感统计</p>
    <div class="chart-container">
      <div class="chart" ref="userEmotionChart"></div>
      <div class="chart" ref="musicEmotionChart"></div>
      <div class="line" ref="userLineChart"></div>
      <p>用户情感数据表</p>
      <p>音乐情感数据表</p>
      <p>用户情感变化折线</p>
    </div>
  </div>
</template>

<script>
import { myRequest } from '@/utils'

export default {
  data() {
    return {
      userEmotionData: null,
      userEmotionChart: null,
      musicEmotionData: null,
      musicEmotionChart: null,
      userLineData: null,
      userLineChart: null
    }
  },
  methods: {
    init() {
      this.userEmotionChart = this.$echarts.init(this.$refs.userEmotionChart);
      this.userEmotionChart.setOption({
        tooltip: {
        trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '用户情感数据表',
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
              { value: this.userEmotionData.anger, name: 'anger' },
              { value: this.userEmotionData.disgust, name: 'disgust' },
              { value: this.userEmotionData.fear, name: 'fear' },
              { value: this.userEmotionData.happiness, name: 'happiness' },
              { value: this.userEmotionData.neutral, name: 'neutral' },
              { value: this.userEmotionData.sadness, name: 'sadness' },
              { value: this.userEmotionData.surprise, name: 'surprise' },
            ]
          }
        ]
      });
      this.musicEmotionChart = this.$echarts.init(this.$refs.musicEmotionChart);
      this.musicEmotionChart.setOption({
        tooltip: {
        trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '音乐情感数据表',
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
              { value: this.musicEmotionData.anger, name: 'anger' },
              { value: this.musicEmotionData.disgust, name: 'disgust' },
              { value: this.musicEmotionData.fear, name: 'fear' },
              { value: this.musicEmotionData.happiness, name: 'happiness' },
              { value: this.musicEmotionData.neutral, name: 'neutral' },
              { value: this.musicEmotionData.sadness, name: 'sadness' },
              { value: this.musicEmotionData.surprise, name: 'surprise' },
            ]
          }
        ]
      });
      this.userLineChart = this.$echarts.init(this.$refs.userLineChart);
      this.userLineChart.setOption({
        title: {
          text: '用户情感变化折线'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['anger', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.userLineData.date
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'anger',
            type: 'line',
            stack: 'Total',
            data: this.userLineData.emotion.anger
          },
          {
            name: 'disgust',
            type: 'line',
            stack: 'Total',
            data: this.userLineData.emotion.disgust
          },
          {
            name: 'fear',
            type: 'line',
            stack: 'Total',
            data: this.userLineData.emotion.fear
          },
          {
            name: 'happiness',
            type: 'line',
            stack: 'Total',
            data: this.userLineData.emotion.happiness
          },
          {
            name: 'sadness',
            type: 'line',
            stack: 'Total',
            data: this.userLineData.emotion.sadness
          },
          {
            name: 'surprise',
            type: 'line',
            stack: 'Total',
            data: this.userLineData.emotion.surprise
          }
        ]
      });
    },
    async getData() {
      let resp = await myRequest.get('/face/data');
      this.userEmotionData = resp.data;

      resp = await myRequest.get('/music/data');
      this.musicEmotionData = resp.data;

      resp = await myRequest.get('/face/day');
      this.userLineData = resp.data;

      return true;
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
.chart-container {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 10px;
}
.chart {
  width: 300px;
  height: 400px;
}
.line {
  margin-top: 20px;
}
</style>
  