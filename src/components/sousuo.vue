<template>
  <div>
    <h2>
      <!-- 把搜索框的数据拿过来 -->
      {{ $route.query.input }}：找到{{ count }}个
    </h2>
    <!-- 搜索结果 -->
    <div class="itmes">
      <div class="item"
        v-for="(item, index) in songList"
        :key="index"
        @click="playlists(item.id,item.picUrl, item.name)"
      >
        <!-- 歌名 -->
        <span>{{ index + 1 }} :{{ item.name }}</span>
          <!-- 歌手 -->
              <span>{{ item.artists[0].name }}</span>
              <!-- 专辑 -->
              <span>{{ item.album.name }}</span>
              <!-- 歌曲时间 -->
              <span>{{ item.duration | conversion }}</span> 
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "sousuo",
  data() {
    return {
      // 歌曲
      songList: [],
      //    总数
      count: 0
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/search",
      mehtod: "get",
      params: {
      keywords: this.$route.query.input,
        limit: 50,
        type: 1
      },
    }).then(res => {
      // 歌曲
      (this.songList = res.data.result.songs),
        // 保存获取到总数量
        (this.count = res.data.result.songCount);
    });
  },
  methods:{
    //   播放音乐
      playlists(id,picUrl, name){
            // console.log(id);
      axios({
        method: "get",
        url: " https://autumnfish.cn/song/url",
        params: {
          id,
          limit :20
        }
      }).then(res => {
        // console.log(res);
        let url = res.data.data[0].url;
        this.$parent.$parent.musicurl = url;
        // 把当前的歌曲图片给父组件   不过这里没有图片
         this.$parent.$parent.musicpic = picUrl;
        //  把当前的名字给父组件
      this.$parent.$parent.musicname = name;
        //  console.log(url);
        //  this.$emit('play',this.musicurl)
      })
   


      }
  }
};
</script>

<style scoped >
h2 {
  font-size: 0.3rem;
}
.itmes {
  font-size: 0.2rem;
}
.item{
    font-size: .15rem;
    margin:  .1rem .1rem;
    border-bottom:.01rem solid rgb(120, 120, 120) ;
}
.item span:nth-child(1){
    font-size: .19rem;
    color: rgb(255, 11, 11);

}
.item span:nth-child(2){
    color: rgb(0, 0, 0);

}
</style>
