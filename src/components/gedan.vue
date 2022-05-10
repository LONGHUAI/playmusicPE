<template>
  <div>
    <!-- 歌单详情页 -->
    <div class="gedan">
             <img v-lazy="topList.coverImgUrl" alt="" />

      <!-- 简介 -->
      <div class="jianjie">
        <p>{{ topList.name }}</p>
        <p>{{ topList.description }}</p>
        <!-- 背景图 -->
                <img v-lazy="topList.coverImgUrl" class="bg" alt="" />

      </div>
    </div>
    <!-- 分类 -->
    <div class="fenlei">
      <!-- active: tag == '欧美'意思就是当tag等于欧美的时候就给他赋值 -->
      <span
        class="item"
        :class="{ active: tag == '全部' }"
        @click="tag = '全部'"
        >全部</span
      >
      <span
        class="item"
        :class="{ active: tag == '欧美' }"
        @click="tag = '欧美'"
        >欧美</span
      >
      <span
        class="item"
        :class="{ active: tag == '华语' }"
        @click="tag = '华语'"
        >华语</span
      >
      <span
        class="item"
        :class="{ active: tag == '流行' }"
        @click="tag = '流行'"
        >流行</span
      >
      <span
        class="item"
        :class="{ active: tag == '说唱' }"
        @click="tag = '说唱'"
        >说唱</span
      >
      <span
        class="item"
        :class="{ active: tag == '摇滚' }"
        @click="tag = '摇滚'"
        >摇滚</span
      >
      <span
        class="item"
        :class="{ active: tag == '民谣' }"
        @click="tag = '民谣'"
        >民谣</span
      >
      <span
        class="item"
        :class="{ active: tag == '电子' }"
        @click="tag = '电子'"
        >电子</span
      >
      <span
        class="item"
        :class="{ active: tag == '轻音乐' }"
        @click="tag = '轻音乐'"
        >轻音乐</span
      >
      <span
        class="item"
        :class="{ active: tag == '影视原声' }"
        @click="tag = '影视原声'"
        >影视原声</span
      >
      <span class="item" :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'"
        >ACG</span
      >
      <span
        class="item"
        :class="{ active: tag == '怀旧' }"
        @click="tag = '怀旧'"
        >怀旧</span
      >
      <span
        class="item"
        :class="{ active: tag == '治愈' }"
        @click="tag = '治愈'"
        >治愈</span
      >
      <span
        class="item"
        :class="{ active: tag == '旅行' }"
        @click="tag = '旅行'"
        >旅行</span
      >
    </div>

    <!-- 歌单列表 -->
    <div>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="toPlaylist(item.id)"
        >
                       <img v-lazy="item.coverImgUrl" alt="" />

          <p>{{ item.name }}</p>
        </div>

      </div>
    </div>
     <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="10"
      :small="true"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 顶部的推荐歌单
      topList: {},
      // 分类歌单
      list: [],
      // tab栏切换
      tag: ""
    };
  },
  // 监听器
  watch: {
    // 利用监听器获取当前数据
    tag() {
      // 利用调用的方法
      // 顶部的  精品歌单
      this.topData(),
        // 歌单列表
        this.listData();
      // 单选择切换时就把页码改成1   有bug
      // this.page = 0
      //  this.listData()
    }
  },
  created() {
    // 利用调用的方法
    // 顶部的  精品歌单
    this.topData(),
      // 歌单列表
      this.listData();
  },
  methods: {
    // 绑定点击歌单跳转效果
    toPlaylist(id) {
      this.$router.push("/gedanxianqing?id=" + id);
    },

    // 顶部的精品歌单
    topData() {
      axios({
        // 方法
        method: "get",
        url: "https://autumnfish.cn/top/playlist/highquality",
        // 参数
        params: {
          limit: 1,
          cat: this.tag
        }
      }).then(res => {
        this.topList = res.data.playlists[0];
      });
    },

    // 分类歌单
    listData() {
      axios({
        // 方法
        method: "get",
        url: "https://autumnfish.cn/top/playlist/",
        // 参数
        params: {
          limit: 10,
          // 起始值  （页码 - 1） * 每页的数据
          offset: (this.page - 1) * 10,
          cat: this.tag
        }
      }).then(res => {
        // 保存总条数
        this.total = res.data.total;
        // 保存数据
        this.list = res.data.playlists;
      });
    },

    // 分页
    handleCurrentChange(num) {
      console.log(`当前页：${num}`);
      // 保存页码
      (this.page = num),
        // 然后刷新重新获取数据
        this.listData();
    }
  }
};
</script>

<style scoped>
.active {
  color: red;
}
.gedan {
  height: 2rem;
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  margin: 0.2rem 0.2rem;
}
.gedan img:nth-child(1) {
  height: 1rem;
  border-radius: 0.1rem;
}
.gedan .jianjie {
  margin: 0 0.1rem;
  font-size: 0.1rem;
}
.gedan .jianjie p:nth-child(1) {
  font-size: 0.13rem;
  color: rgb(255, 0, 0);
}
/* 背景图片 */
.gedan .bg {
  width: 100%;
  height: 3rem;
  position: absolute;
  left: 0;
  top: 1rem;
  right: 0;
  bottom: 0;
  z-index: -1;
  /* 模糊 */
  filter: blur(0.1rem);
}

/* 分类 */
.fenlei {
  font-size: 0.1rem;
  margin: 0.1rem 0.1rem;
}

/* 歌单列表 */
.items {
  font-size: 0.1rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.item {
  width: 1rem;
  margin: 0.1rem 0.1rem;
}
.item img {
  border-radius: 0.1rem;
  height: 1rem;
}
</style>
