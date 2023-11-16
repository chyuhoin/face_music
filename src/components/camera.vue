 
<template>  
    <div>  
      <video ref="videoElement" autoplay></video>  
      <el-button @click="startCamera()">启动摄像头</el-button>  
      <el-button @click="stopCamera()">停止摄像头</el-button>  
    </div>  
  </template>  
    
  <script>  
  export default {  
    data() {  
      return {  
        stream: null  
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
      }  
    }  
  };  
  </script>