 
<template>
  <div>
    <video ref="videoElement" autoplay></video>
    <el-button @click="startCamera()">启动摄像头</el-button>
    <el-button @click="stopCamera()">停止摄像头</el-button>
  </div>
</template>  
    
<script>
import { myRequest } from '@/utils'

export default {
  data() {
    return {
      stream: null,
      test: "hhh222333"
    };
  },
  methods: {
    startCamera() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.stream = stream;
          this.$refs.videoElement.srcObject = stream;
        })
        .catch(error => {
          alert("无法访问摄像头", error);
        });
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      this.$refs.videoElement.srcObject = null;
    },
    dataURLtoFile(dataUrl, fileName){
        let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type:mime});
    }
  },
  mounted() {
    // 创建一个 HTMLCanvasElement 元素
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    // 每隔一段时间截取视频流的图片并上传
    setInterval(() => {
      console.log(this.test)
      console.log(this.stream)

      // 确保视频流已经准备好
      if (this.stream) {
        // 设置画布尺寸和视频尺寸一致
        canvas.width = this.$refs.videoElement.videoWidth;
        canvas.height = this.$refs.videoElement.videoHeight;

        // 绘制视频帧到画布上
        context.drawImage(this.$refs.videoElement, 0, 0, canvas.width, canvas.height);

        // 将画布内容转换为图像数据URL
        let imageURL = canvas.toDataURL('image/png');

        // 创建一个 FormData 对象
        let formData = new FormData();
        formData.append('file', this.dataURLtoFile(imageURL, "face.png"));

        // 使用 Axios 发送 POST 请求
        myRequest.post('/examine', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data
          }
        })
          .then(function(response) {
            // 处理响应
            console.log(response.data);
          })
          .catch(function(error) {
            // 处理错误
            console.log(error);
          });
      }
    }, 10000); // 每隔10秒钟上传一次
  }
};
</script>