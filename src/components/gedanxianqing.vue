<template>
  <div>
    <!-- 标题栏 -->
    <div class="biaoti">
      <img class="biaotipimg" :src="playlist.coverImgUrl" alt="" />

      <div class="jiesao">
        <p>
          {{ playlist.name }}
        </p>
        <!-- 头像名字 -->
        <div class="jiesao">
          <!-- 创作者的头像 -->

          <span><img :src="playlist.creator.avatarUrl" alt="" /> </span>

          <!-- 标签 -->
          <span>标签：</span>
          <span v-for="(item, index) in playlist.tags" :key="index">
            {{ item }}/
          </span>
          <p>{{ playlist.description }}</p>
          <i>{{ playlist.createTime | filterTime }} 创建</i>
        </div>
      </div>
    </div>

<!-- tab -->
<div class="tab"><span :class="{tabcolor:tag == '歌曲'} " @click="gequ">歌曲</span> 
                 <span :class="{tabcolor:tag == '评论'} " @click="pinglun">评论</span></div>
  
  <div class="tablist">
  
    <!-- 歌曲列表 -->
    <div class="tabmusic">
      <table>
        <tbody>
          <!-- 循环区域 -->
          <tr
            v-for="(item, index) in tracks"
            :key="index"
            @click="playmusic(item.id,item.name,item.picUrl)"
          >
            <td>{{ index + 1 }}</td>

            <!-- 歌曲图片 -->
            <td>
              <img :src="item.al.picUrl" alt="" />
            </td>
            <!-- 标题 -->
            <td>
              <span>{{ item.name }}</span>
            </td>
            <!-- 歌手 -->
            <td>
              <span>{{ item.ar[0].name }}</span>
            </td>
            <td>
              {{ item.dt | conversion }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


<!-- 评论区 -->
    <div class="tabpinglun">
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

      >
      </el-pagination>
    </div>  
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tag:'歌曲',
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单详情数据
      playlist: {},
      // 歌曲数据
      tracks: [],
      //热门评论
      hotComment: [],
      // 热门评论数量
      hotCount: "",
      // 最新评论数据
      comment: []
    };
  },

  created() {
    // 歌单详情
    axios({
      method: "get",
      url: "https://autumnfish.cn/playlist/detail",
      params: {
        // 然后从根元素的路由上面去读取数据，并且赋值
        id: this.$route.query.id
      }
    }).then(res => {
      // 这里的数据返回就是带有唯一性的数据
      this.playlist = res.data.playlist;
    }),
      // 获取歌曲评论    热门
      axios({
        method: "get",
        url: "https://autumnfish.cn/comment/hot",
        params: {
          // 然后从根元素的路由上面去读取数据，并且赋值
          id: this.$route.query.id,
          type: 2
        }
      }).then(res => {
        // 这里的数据返回就是带有唯一性的数据
        this.hotComment = res.data.hotComments;
        // 评论个数
        this.hotCount = res.data.total;
      }),
      // 最新评论
      axios({
        method: "get",
        url: "https://autumnfish.cn/comment/playlist",
        params: {
          // 然后从根元素的路由上面去读取数据，并且赋值
          id: this.$route.query.id,
          limit: 10,
          offset: 0
        }
      }).then(res => {
        // console.log(res)
        // 总数
        this.total = res.data.total;
        // 评论数据
        this.comment = res.data.comments;
      }),
      // 歌曲数据
      axios({
        method: "get",
        url: "https://autumnfish.cn/playlist/detail",
        params: {
          // 然后从根元素的路由上面去读取数据，并且赋值
          id: this.$route.query.id
        }
      }).then(res => {
        // 这里的数据返回就是带有唯一性的数据
        this.tracks = res.data.playlist.tracks;
      });
  },

  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      (this.page = val),
        // 最新评论
        axios({
          method: "get",
          url: "https://autumnfish.cn/comment/playlist",
          params: {
            // 然后从根元素的路由上面去读取数据，并且赋值
            id: this.$route.query.id,
            limit: 10,
            offset: (this.page - 1) * 10
          }
        }).then(res => {
          // console.log(res)
          // 总数
          // 评论数据

          this.comment = res.data.comments;
        });
    },

    // 播放音乐
    playmusic(id,name,picUrl) {
      axios({
        method: "get",
        url: "https://autumnfish.cn/song/url",
        //  参数
        params: {
          id
          //  limit:10
        }
      }).then(res => {
        let url = res.data.data[0].url;
        // 使用$parent向父组件的musicURL传递参数
                this.$parent.$parent.musicurl = url;
  // 把当前的歌曲图片给父组件   不过这里没有图片
         this.$parent.$parent.musicpic = picUrl;
        //  把当前的名字给父组件
      this.$parent.$parent.musicname = name;
      });
    },

    // 点击歌曲
    gequ(){
         let tabpinglun = document.querySelector('.tabpinglun')
      let tabmusic = document.querySelector('.tabmusic')
     this.tag = '歌曲',
     console.log(this.tag);
     tabpinglun.style.display = 'none',
     tabmusic.style.display = 'block'

    
    },
    pinglun(){
      let tabpinglun = document.querySelector('.tabpinglun')
      let tabmusic = document.querySelector('.tabmusic')
      this.tag = '评论',
     console.log(this.tag);
      tabpinglun.style.display = 'block',
     tabmusic.style.display = 'none'

    }
  },
  // 过滤器
  // 2. 定义过滤器
  filters: {
    //3.定义一个处理函数，参数value为要处理数据
    conversion: function(value) {
      //调用Date的方法，处理时间戳
      var fen = new Date(value).getMinutes();
      fen = fen < 10 ? "0" + fen : fen;
      // console.log(fen);
      var miao = new Date(value).getSeconds();
      miao = miao < 10 ? "0" + miao : miao;
      // console.log(miao);
      return fen + ":" + miao;
    }
  }
};
</script>

<style scoped>
.biaoti {
  font-size: 0.2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
/* 标题图片 */
.biaoti .biaotipimg {
  height: 1rem;
  border-radius: 0.1rem;
}
.jiesao {
  width: 2.5rem;
  overflow: hidden;
  font-size: 0.15rem;
  margin: 0.1rem 0.1rem;
}
.jiesao p {
  margin: 0 0.2rem;
}
.jiesao img {
  border-radius: 0.1rem;
  width: 0.5rem;
}

table {
  font-size: 0.2rem;
}
table img {
  width: 0.5rem;
  border-radius: 0.1rem;
}
td span{
  font-size: .15rem;
}
.tab{
  font-size: .2rem;
}
.tabcolor{
  color: red;
}
.tabpinglun{
  display: none;
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
