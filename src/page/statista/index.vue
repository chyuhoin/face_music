<template>
  <div class="statista">
    <div class="emotion-chart" style="margin-bottom: 80px;">
      <p>用户个人情感统计</p>
      <div class="chart-container">
        <div class="chart" ref="userEmotionChart"></div>
        <div class="line" ref="userLineChart"></div>
        <p>情感数据统计</p>
        <p>情感变化折线</p>
      </div>
    </div>
    <span>心理预警</span>
    <div class="alarm">
      {{ alarmText }}
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
      userLineData: null,
      userLineChart: null,
      alarmText: null
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
            data: this.userLineData.emotion.anger
          },
          {
            name: 'disgust',
            type: 'line',
            data: this.userLineData.emotion.disgust
          },
          {
            name: 'fear',
            type: 'line',
            data: this.userLineData.emotion.fear
          },
          {
            name: 'happiness',
            type: 'line',
            data: this.userLineData.emotion.happiness
          },
          {
            name: 'neutral',
            type: 'line',
            data: this.userLineData.emotion.neutral
          },
          {
            name: 'sadness',
            type: 'line',
            data: this.userLineData.emotion.sadness
          },
          {
            name: 'surprise',
            type: 'line',
            data: this.userLineData.emotion.surprise
          }
        ]
      });
      this.getAlarmText();
    },
    async getData() {
      let resp = await myRequest.get('/face/user/all');
      this.userEmotionData = resp.data;

      resp = await myRequest.get('/face/user/day');
      this.userLineData = resp.data;

      return true;
    },
    getAlarmText() {
      let emotionList = [
        {tp: "anger", val: this.userEmotionData.anger},
        {tp: "disgust", val: this.userEmotionData.disgust},
        {tp: "fear", val: this.userEmotionData.fear},
        {tp: "happiness", val: this.userEmotionData.happiness},
        {tp: "neutral", val: this.userEmotionData.neutral},
        {tp: "sadness", val: this.userEmotionData.sadness},
        {tp: "surprise", val: this.userEmotionData.surprise},
      ];
      emotionList.sort((x, y) => {return y.val - x.val});
      if(emotionList[0].tp === 'anger') this.alarmText = "您的总心情中，生气最多，请注意";
      if(emotionList[0].tp === 'disgust') this.alarmText = "您的总心情中，厌恶最多，请注意";
      if(emotionList[0].tp === 'fear') this.alarmText = "您的总心情中，恐惧最多，请注意";
      if(emotionList[0].tp === 'happiness') this.alarmText = "您的总心情中，开心最多";
      if(emotionList[0].tp === 'neutral') this.alarmText = "您的总心情中，平静最多";
      if(emotionList[0].tp === 'sadness') this.alarmText = "您的总心情中，伤心最多，请注意";
      if(emotionList[0].tp === 'surprise') this.alarmText = "您的总心情中，惊讶最多，请注意";
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
.statista {
  padding: 50px;
  text-align: center;
}
.chart-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}
.chart {
  width: 300px;
  height: 400px;
}
.line {
  margin-top: 20px;
}
.alarm {
  margin: 10px;
  font-size: larger;
}
</style>
  