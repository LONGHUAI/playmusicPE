<template>
  <div>
    <!-- 轮播图 -->
    <div class="lunbotu">
      <el-carousel arrow="always">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img v-lazy="item.imageUrl" :key="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tuijian">
      <p>推荐歌单</p>
      <div class="items">
        <!-- @click='toPlaylist(item.id)' -->
        <div class="item" v-for="(item, index) in tuijian" :key="index"   @click='toPlaylist(item.id)'>
          <img v-lazy="item.picUrl" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="zuixingmuisc">
      <p>最新音乐</p>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in songs"
          :key="index"
          @click="play(item.id)"
        >
          <!--  @click="playmusic" -->
          <!-- <div class="play">▲</div> -->
          <img
            v-lazy="item.picUrl"
            :key="item.picUrl"
            alt=""
            @click="musicpic(item.picUrl, item.name)"
          />
          <br />
          <span>{{ item.name }}</span>
          <span>{{ item.song.artists[0].name }}</span>
        </div>
      </div>
    </div>

    <!-- mv -->
    <div class="mv">
      <p>推荐mv</p>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in mvs"
          :key="index"
          @click="toPlaymv(item.id)"
        >
          <img v-lazy="item.picUrl" alt="" />
          <div class="mv-jiesao">
            <!-- 歌手 -->
            <span class="name">歌曲：{{ item.name }}</span>
            <br />
            <!-- 歌曲简介 -->
            <span class="singer">简介：{{ item.artistName }}</span>
            <!-- 播放量 -->
            <p class="num">播放量：{{item.playCount}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "music",

  data() {
    return {
      //   轮播图
      banners: [],
      // 推荐歌单
      tuijian: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: []
    };
  },
  props: ["chuangdi"],
  //   生命周期函数
  created() {
    // 轮播图
    axios({
      url: "https://autumnfish.cn/banner",
      // 方法
      method: "get",
      params: {
        type: 0
      }
    }).then(res => {
      this.banners = res.data.banners;
    });

    // 推荐歌单

    axios({
      url: "https://autumnfish.cn/personalized",
      method: "get",
      params: {
        limit: 10
      }
    }).then(res => {
      this.tuijian = res.data.result;
    }),
      // 最新音乐
      axios({
        url: "https://autumnfish.cn/personalized/newsong",
        // 方法
        method: "get",
        params:{
          limit :20

        }
      }).then(res => {
        // console.log(res);
        this.songs = res.data.result;
      }),
      // 主页MV
      axios({
        url: "  https://autumnfish.cn/personalized/mv ",
        // 方法
        method: "get"
      }).then(res => {
        // console.log(res);
        this.mvs = res.data.result;
      });
  },

  // 方法
  methods: {
    // 播放音乐
    play(id) {
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
        //  console.log(url);
        //  this.$emit('play',this.musicurl)
      });
    },
    musicpic(picUrl, name) {
      // console.log(picUrl);
      // console.log(id);
      this.$parent.$parent.musicpic = picUrl;
      this.$parent.$parent.musicname = name;
    },
    // 父子组件
    // musicpic(picUrl,name){
    //   let names = name
    //   this.$emit('showCityName', names)
    //   console.log(names);
    // }
    toPlaymv(id){
      this.$router.push('/mvs?mvid=' + id)
    },
      // 去歌单详情页，并携带数据,数据就是他的唯一标识符也就是id
      // 绑定点击歌单跳转效果
    toPlaylist(id) {
      this.$router.push("/gedanxianqing?id=" + id);
    },
  }
};
</script>

<style scoped>
.el-carousel {
  height: 1.3rem;
  line-height: 1.3rem;
  background: #d43b33;
  overflow: hidden;

  /* line-height: 1.3rem; */
}
.el-carousel img {
  width: 100%;
}

/* 推荐歌单 */
.tuijian {
  font-size: 0.1rem;
  width: 100%;
}
/* 所以的标题栏都设置为这个样式 */
.tuijian p:nth-child(1),
.zuixingmuisc p:nth-child(1),
.mv p:nth-child(1) {
  font-size: 0.2rem;
  margin-top: 0.1rem;
  border-left: #d43b33 0.1rem solid;
}
.tuijian .items {
  /* display: inline-block; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* align-items: center; */
}
.tuijian .item {
  width: 1rem;
}
.tuijian img {
  border-radius: 0.1rem;
  box-shadow: rgb(100, 99, 95) 0.01rem 0.01rem 0.1rem;
  width: 1rem;
  margin: 0.1rem 0.01rem 0 0.01rem;
}

/* 最新音乐 */
.zuixingmuisc {
  font-size: 0.1rem;
}
.zuixingmuisc .items {
  /* display: inline-block; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* align-items: center; */
}
.zuixingmuisc .item {
  position: relative;
  width: 0.9rem;
}
.zuixingmuisc img {
  border-radius: 0.1rem;
  box-shadow: rgb(100, 99, 95) 0.01rem 0.01rem 0.1rem;
  width: 0.6rem;
  margin: 0.1rem 0.1rem 0 0.1rem;
}
/* 播放按钮 */
/* .zuixingmuisc .play{
  font-size: .2rem;
    display: none;
  position: absolute;
  z-index: 9;
left: 50%;
top: 50%;
transform: translate(-80%,-100%);
} */

/* 推荐mv */
.mv {
  font-size: 0.14rem;
}
.mv .item {
  /* margin: .2rem 0; */
  /* display: inline-block; */
  display: flex;
  justify-content: flex-start;
  /* flex-wrap:wrap */
  align-items: center;
  border-top: 0.01rem solid rgb(197, 197, 197);
  border-bottom: 0.01rem solid rgb(197, 197, 197);
 
}
.mv .mv-jiesao {
  margin: 0.2rem 0;
}
.mv img {
  width: 2rem;
  margin: 0.3rem 0.1rem .3rem 0.1rem;
  border-radius: 0.1rem;
  box-shadow: rgb(100, 99, 95) 0.01rem 0.01rem 0.1rem;
}
</style>
