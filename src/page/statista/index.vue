<template>
  <div>
    <el-container style="display: flex; line-height: 60px">
      <div class="statista">
        <div class="emotion-chart" style="margin-bottom: 20px">
          <p style="font-size: 20px; margin-top:20px; margin-bottom:20px; font-weight: bold;text-align: center">用户个人情感统计</p>
          <div class="chart-container">
            <div class="chart" ref="userEmotionChart"></div>
            <div class="line" ref="userLineChart"></div>
            <p>情感数据统计</p>
            <p>情感变化折线</p>
          </div>
        </div>
      </div>
    </el-container>
    
    <el-divider></el-divider>
      <p style="font-size: 20px; margin-top:20px; margin-bottom:20px; font-weight: bold;text-align: center">用户近期情感指数</p>
      <el-container style="disline-height: 60px ;margin-top: 30px; display: flex; text-align: -webkit-center;">
        <el-progress type="circle" :percentage="getEmoScore('anger')" color = "#5470C6" style=" margin-left: auto;flex: 1"></el-progress>
        <el-progress type="circle" :percentage="getEmoScore('disgust')" color = "#7DCC58" style="flex: 1"></el-progress>
        <el-progress type="circle" :percentage="getEmoScore('fear')" color = "#FAC858" style="flex: 1"></el-progress>
        <el-progress type="circle" :percentage="getEmoScore('happiness')" color = "#ff7070" style="flex: 1"></el-progress>
        <el-progress type="circle" :percentage="getEmoScore('neutral')" color = "#7ED3F4" style="flex: 1"></el-progress>
        <el-progress type="circle" :percentage="getEmoScore('sadness')" color = "#40B27D" style="flex: 1"></el-progress>
        <el-progress type="circle" :percentage="getEmoScore('surprise')" color = "#FC8452" style="flex: 1"></el-progress>
      </el-container>


    <el-divider></el-divider>
    <p style="font-size: 20px; margin-top:20px; margin-bottom:20px; font-weight: bold;text-align: center">心理预警和建议</p>

    <div style="font-size: 18px; text-align: left; padding-bottom: 20px; white-space: pre-wrap;">
        {{randomSentence}}
    </div>

    <el-divider></el-divider>
    <p style="font-size: 20px; margin-top:20px; margin-bottom:20px; font-weight: bold;text-align: center">用户识别历史（单位：%）</p>

    <el-container style="display:flex; line-height: 60px">
        <el-table 
            :data="tableData"
            :header-cell-style="{'text-align':'center',
                    background:'#4C76B2',height:'30px',border: '1px solid #57A6F4' ,fontSize: '60px'}"
            :cell-style="{border: '1px solid #57A6F4', 'text-align':'center',}">

            <el-table-column prop="count" label="次数">
            </el-table-column>
            <el-table-column prop="anger" label="生气">
            </el-table-column>
            <el-table-column prop="disgust" label="厌恶">
            </el-table-column>
            <el-table-column prop="fear" label="害怕">
            </el-table-column>
            <el-table-column prop="happiness" label="开心">
            </el-table-column>
            <el-table-column prop="neutral" label="平静">
            </el-table-column>
            <el-table-column prop="sadness" label="伤心">
            </el-table-column>
            <el-table-column prop="surprise" label="惊讶">
            </el-table-column>
            <el-table-column prop="gmt_create" label="时间">
            </el-table-column>
        </el-table>
    </el-container>
  </div>
</template>

<script>
import { myRequest } from "@/utils";

export default {
  data() {
    return {
      tableData: [],
      userEmotionData: null,
      userEmotionChart: null,
      userLineData: null,
      userLineChart: null,
      alarmText: null,
    };
  },
  methods: {
    getEmoScore(type) {
      if (!this.userLineData) return 0;
      let n = this.userLineData.date;
      let arr = this.userLineData.emotion;
      if (arr !== undefined) arr = arr[type];
      if (n !== undefined) n = n.length;
      if (n == 0) return 0;
      if (n == 1) return arr[0];
      return parseFloat(((arr[n - 1] + arr[n - 2]) * 0.5).toFixed(2));
    },
    init() {
      this.userEmotionChart = this.$echarts.init(this.$refs.userEmotionChart);
      this.userEmotionChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "用户情感数据表",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.userEmotionData.anger, name: "anger" },
              { value: this.userEmotionData.disgust, name: "disgust" },
              { value: this.userEmotionData.fear, name: "fear" },
              { value: this.userEmotionData.happiness, name: "happiness" },
              { value: this.userEmotionData.neutral, name: "neutral" },
              { value: this.userEmotionData.sadness, name: "sadness" },
              { value: this.userEmotionData.surprise, name: "surprise" },
            ],
          },
        ],
      });
      this.userLineChart = this.$echarts.init(this.$refs.userLineChart);
      this.userLineChart.setOption({
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "anger",
            "disgust",
            "fear",
            "happiness",
            "neutral",
            "sadness",
            "surprise",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.userLineData.date,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "anger",
            type: "line",
            data: this.userLineData.emotion.anger,
          },
          {
            name: "disgust",
            type: "line",
            data: this.userLineData.emotion.disgust,
          },
          {
            name: "fear",
            type: "line",
            data: this.userLineData.emotion.fear,
          },
          {
            name: "happiness",
            type: "line",
            data: this.userLineData.emotion.happiness,
          },
          {
            name: "neutral",
            type: "line",
            data: this.userLineData.emotion.neutral,
          },
          {
            name: "sadness",
            type: "line",
            data: this.userLineData.emotion.sadness,
          },
          {
            name: "surprise",
            type: "line",
            data: this.userLineData.emotion.surprise,
          },
        ],
      });
      this.getAlarmText();
    },
    async getData() {
      let resp = await myRequest.get("/face/user/all");
      this.userEmotionData = resp.data;

      resp = await myRequest.get("/face/user/day");
      this.userLineData = resp.data;


      for (let i = 0; i < this.userLineData.date.length; i++) {
        this.tableData.push({
          count: i + 1,
          anger: this.userLineData.emotion.anger[i].toFixed(2),
          disgust: this.userLineData.emotion.disgust[i].toFixed(2),
          fear: this.userLineData.emotion.fear[i].toFixed(2),
          happiness: this.userLineData.emotion.happiness[i].toFixed(2),
          neutral: this.userLineData.emotion.neutral[i].toFixed(2),
          sadness: this.userLineData.emotion.sadness[i].toFixed(2),
          surprise: this.userLineData.emotion.surprise[i].toFixed(2),
          gmt_create: this.userLineData.date[i]
        })
      }
      this.tableData.push(1)

      return true;
    },
    getAlarmText() {
      if (!this.userEmotionData) return -1;
      let emotionList = [
        { tp: "anger", val: this.userEmotionData.anger },
        { tp: "disgust", val: this.userEmotionData.disgust },
        { tp: "fear", val: this.userEmotionData.fear },
        { tp: "happiness", val: this.userEmotionData.happiness },
        { tp: "neutral", val: this.userEmotionData.neutral },
        { tp: "sadness", val: this.userEmotionData.sadness },
        { tp: "surprise", val: this.userEmotionData.surprise },
      ];
      emotionList.sort((x, y) => {
        return y.val - x.val;
      });
      if (emotionList[0].tp === "anger") return 1;
      if (emotionList[0].tp === "disgust") return 2;
      if (emotionList[0].tp === "fear") return 3;
      if (emotionList[0].tp === "happiness") return 4;
      if (emotionList[0].tp === "neutral") return 5;
      if (emotionList[0].tp === "sadness") return 6;
      if (emotionList[0].tp === "surprise") return 7;
      return -1;
    },
  },
  computed:{
    randomSentence() {
      const alarm = this.getAlarmText()
      switch (alarm)
      {
        case 1: return "尝试深呼吸和冷静思考，寻找解决问题的方式，而非将情绪发泄在他人身上。\n1、静思：可以坐下来好好思考一下有情绪的自己，把不良的情绪消化掉，让我们内心平静。\n2、运动：当一个人情绪低落时，往往不爱动，越不动注意力就越不易转移，情绪就越低落。因此可以通过跑步、打球等体育活动改变不良情绪。";
        case 2: return "审视厌恶的源头，尝试理解并逐步化解这些情绪，或者考虑专业心理支持。\n1、听音乐：在心情低落的时候听听动感热烈的音乐，在比较幸福激动时听一些舒缓的音乐，对情绪有一定的调节作用。\n2、反省：对旧事难以释怀是毫无作用的，因为我们都无法更改以往，关键的是汲取教训。";
        case 3: return "面对恐惧，勇敢地寻求支持，与亲友分享感受，或寻求专业心理咨询，以逐步克服害怕的情绪。\n1、听音乐：在心情低落的时候听听动感热烈的音乐，在比较幸福激动时听一些舒缓的音乐，对情绪有一定的调节作用。\n2、反省：对旧事难以释怀是毫无作用的，因为我们都无法更改以往，关键的是汲取教训。";
        case 4: return "保持开心时的平衡，避免冲动行为，并确保喜悦的来源是积极、健康的。\n1、听音乐：在心情低落的时候听听动感热烈的音乐，在比较幸福激动时听一些舒缓的音乐，对情绪有一定的调节作用。\n2、运动：当一个人情绪低落时，往往不爱动，越不动注意力就越不易转移，情绪就越低落。因此可以通过跑步、打球等体育活动改变不良情绪。";
        case 5: return "培养冷静应对压力的技能，例如通过冥想或运动来维持内心平静和情绪稳定。\n1、听音乐：在心情低落的时候听听动感热烈的音乐，在比较幸福激动时听一些舒缓的音乐，对情绪有一定的调节作用。\n2、反省：对旧事难以释怀是毫无作用的，因为我们都无法更改以往，关键的是汲取教训。\n3、购物：购买欲望可能遮盖你一切的消极情绪，买东西也不可多得调整情绪的一个好方法。\n4、深呼吸：当遇到愤怒、紧张、揪心的事，心情忽然要激动了，马上深呼吸，可以有效缓解。";
        case 6: return "接受悲伤情绪，寻找情感支持，同时考虑专业心理辅导以处理深层次的伤感。\n1、大哭：在悲痛欲绝时大哭一场，可使情绪平静。哭是解除紧张、烦恼、痛苦的好方法。美国心理专家威费雷认为，眼泪能把有机体在应激反应过程中产生的某种毒素排出去。\n2、吃东西：吃可以让人获得幸福感和满足感，当你不开心的时候，就去吃你觉得好吃的东西吧！";
        case 7: return "面对惊讶或震惊，逐渐接受现实，与亲友分享感受，或考虑专业心理辅导以处理不同寻常的情境。\n1、深呼吸：当遇到愤怒、紧张、揪心的事，心情忽然要激动了，马上深呼吸，可以有效缓解。\n2、自我鼓励：用某些哲理或某些名言安慰自己，鼓励自己同痛苦、逆境作斗争。";
        default: return "出错了";
      }
    },
  },
  mounted() {
    this.getData().then(() => {
      setTimeout(this.init, 500);
    });
  },
};
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
  