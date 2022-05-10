<template>
  <div>
    <div class="seemv">
      <h2></h2>
      <video controls autoplay :src="mvurl.url"></video>
    </div>
    <div class="mvjiesao">
      <!-- 歌手头像 -->
      <img v-lazy="icon" alt="" />
      <!-- 歌手名字 -->
      <span class="name">{{ mvinfo.name }}</span>
    </div>
    <!-- 发布时间与介绍 -->
    <div class="mv-info">
      <span class="date">发布：{{ mvinfo.publishTime }}</span>
      <span class="number">播放：{{ mvinfo.playCount  | wan}}次</span>
      <!-- 简介 -->
      <p class="desc">
        {{ mvinfo.desc }}
      </p>
    </div>

    <!-- 评论区 -->
    <div class="pinglun">
      <p>精彩评论({{ total }})</p>
      <div class="items">
        <!-- 用户头像 -->
        <div class="item" v-for="(item, index) in hotComment" :key="index">
          <img :src="item.user.avatarUrl" alt="" />
          <!-- <img src="http://p1.music.126.net/sRVN7yqE0Ja-dDXVNeh3gQ==/109951165103609061.jpg" alt=""> -->
          <div>
            <!-- 用户名字 -->
            <span class="name">{{ item.user.nickname }}：</span>
            <!-- 评论 -->
            <span class="comment">{{ item.content }}</span>
            <br />
            <i class="date">{{ item.time | filterTime }}</i>
          </div>
        </div>
      </div>

      <!-- 最新评论 -->
      <p>最新评论</p>
      <div class="items">
        <!-- 用户头像 -->
        <div class="item" v-for="(item, index) in comment" :key="index">
          <img v-lazy="item.user.avatarUrl" alt="" />
          <!-- <img src="http://p1.music.126.net/sRVN7yqE0Ja-dDXVNeh3gQ==/109951165103609061.jpg" alt=""> -->
          <div>
            <!-- 用户名字 -->
            <span class="name">{{ item.user.nickname }}：</span>
            <!-- 评论 -->
            <span class="comment">{{ item.content }}</span>
            <br />
            <i class="date">{{ item.time | filterTime }}</i>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="10"
        :small="true"
        :limit="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "mvs",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mvurl
      mvurl: "",
      // mv推荐
      mvs: [],
      // mv的相关信息
      mvinfo: {},
      // 歌手的头像
      icon: "",
      //热门评论
      hotComment: [],
      // 热门评论数量
      hotCount: "",
      // 最新评论数据
      comment: []
    };
  },
   // 局部过滤器
    // 2. 定义过滤器
  filters: {
    //3.定义一个处理函数，参数value为要处理数据
    wan: function (value) {
     let num = value
     if (num > 100000) {
       num = parseInt (num / 10000) + '万+'
        return num
     } else{
       num 
        return num
     }
    },
  },


  // 生命周期一进去就加载
  created() {
    // mv视频数据
    axios({
      method: "get",
      params: {
        id: this.$route.query.mvid
      },
      url: "https://autumnfish.cn/mv/url"
    }).then(res => {
      this.mvurl = res.data.data;
    });

    // 获取mv的相关信息
    axios({
      method: "get",
      params: {
        mvid: this.$route.query.mvid
      },
      url: " https://autumnfish.cn/mv/detail"
    }).then(res => {
      this.mvinfo = res.data.data
      //   // 处理次数
      // for(let i = 0;i<this.mvinfo.length;i++){
      //   if(this.mvinfo[i].playCount>100000){
      //     console.log('1');
      //     this.mvinfo[i].playCount = parseInt(this.mvinfo[i].playCount / 10000) + '万'
      //   }
      // }
    

      // 获取歌手的头像
      axios({
        url: "https://autumnfish.cn/artists",
        method: "get",
        params: {
          // 这里获取歌手的id
          id: this.mvinfo.artists[0].id
        }
      }).then(res => {
        this.icon = res.data.artist.picUrl;
      });
    }),
      // 获取评论数据

      axios({
        url: " https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.mvid,
          limit: 10,
          offset: 0
        }
      }).then(res => {
        // 热门评论
        // 这里的数据返回就是带有唯一性的数据
        this.hotComment = res.data.hotComments;
        // 评论个数
        (this.hotCount = res.data.total),
          // 最新评论
          // 总数
          (this.total = res.data.total);
        // 评论数据
        this.comment = res.data.comments;
      });
  },

  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      (this.page = val),
        axios({
          url: " https://autumnfish.cn/comment/mv",
          method: "get",
          params: {
            id: this.$route.query.mvid,
            limit: 10,
            offset: (this.page - 1) * 10
          }
        }).then(res => {
          // console.log(res);
          // 热门评论
          // 热门评论
          // 这里的数据返回就是带有唯一性的数据
          this.hotComment = res.data.hotComments;
          // 评论个数
          (this.hotCount = res.data.total),
            // 最新评论
            // 总数
            (this.total = res.data.total);
          // 评论数据
          this.comment = res.data.comments;
        });
    }
  }
};
</script>

<style scoped>
video {
  width: 100%;
}
/* mv歌手头像和名字 */
.mvjiesao {
  
  display: flex;
  font-size: 0.2rem;
  justify-content: flex-start;
  align-items: center;
}
.mvjiesao img {
  margin: 0.1rem 0.1rem;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
}
/* 发布时间与介绍 */
.mv-info {
  font-size: 0.2rem;
}
.mv-info span:nth-child(1) {
  color: rgb(148, 148, 148);

  margin: 0.1rem 0.1rem;
}
.mv-info span {
  margin: 0.1rem 0.1rem;
}
.mv-info p {
  margin: 0.1rem 0.1rem;
  font-size: 0.1rem;
}

/* 评论区 */
.pinglun {
  font-size: 0.2rem;
}
.pinglun .item {
  display: flex;
  justify-content: flex-start;
  margin: 0.2rem 0.1rem;
 border-bottom:.01rem solid rgb(184, 184, 184) ;
}

.pinglun .item img {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
}
/* 评论内容 */
.pinglun .item .comment {
  font-size: 0.17rem;
}
.pinglun .item i {
  font-size: 0.1rem;
  color: rgb(146, 146, 146);
}
</style>
