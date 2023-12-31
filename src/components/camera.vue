 <template>
  <div>
    <div> 
      <video controls width="800" height = "500" ref="videoElement" autoplay></video>
    </div>
    <div>
      <el-button @click="startCamera()" type="success" 
      style="flex:1; margin-left:200px; margin-top:20px; height: 40px"
      >启动摄像头</el-button>
      <el-button @click="stopCamera()" type="danger" 
      style="flex:1; margin-left:170px; margin-top:20px; height: 40px"
      >停止摄像头</el-button>
    </div>
  </div>
</template>  
    
<script>
import { myRequest, createSong } from '@/utils'
import { mapActions } from '@/store/helper/music'
import { getSongDetail } from "@/api"
import { confirm } from "@/base/confirm"

export default {
  data() {
    return {
      stream: null,
      listening: false,
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
    },
    async recommend(emotion) {
      let resp = await myRequest.post("/recommend", { emotion })
      if (resp.data.message !== '') return;
      const songDetails = await getSongDetail(resp.data.recommend)
      const songs = songDetails.songs.map(({ id, name, al, ar, mv, dt }) =>
        createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          mvId: mv,
          albumName: al.name,
          img: al.picUrl,
        }),
      )
      this.addToPlaylist(songs[0])
      confirm(`已经添加歌曲：${songDetails.songs[0].name}进入播放队列！`)
    },
    ...mapActions(["startSong", "addToPlaylist"])
  },
  mounted() {
    // 创建一个 HTMLCanvasElement 元素
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    // 每隔一段时间截取视频流的图片并上传
    this.listening = setInterval(() => {
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

        myRequest.post('/examine', formData)
        .then(response => {
          if (!response.data.id) return;
          this.recommend(response.data.score)
        })
        .catch(function(error) {
        });
      }
    }, 10000); // 每隔10秒钟上传一次
  },
  beforeDestroy() {
    clearInterval(this.listening)
  }
};
</script>
