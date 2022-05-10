<template>
  <div>
    <!-- 分类 -->
    <div class="fenlei">
      <p>
        地区: <span :class="{ active: area == '全部' }"
              @click="area = '全部'">全部</span>
        <span :class="{ active: area == '内地' }"
              @click="area = '内地'">内地</span>
        <span :class="{ active: area == '港台' }"
              @click="area = '港台'">港台</span>
        <span :class="{ active: area == '欧美' }"
              @click="area = '欧美'"> 欧美</span>
        <span :class="{ active: area == '日本' }"
              @click="area = '日本'">日本</span>
        <span :class="{ active: area == '韩国' }"
              @click="area = '韩国'">韩国</span>
      </p>

      <p>
        类型: <span  :class="{ active: type == '全部' }"
              @click="type = '全部'">全部</span>
        <span  :class="{ active: type == '官方版' }"
              @click="type = '官方版'">官方版</span>
        <span  :class="{ active: type == '原声' }"
              @click="type = '原声'">原声</span>
        <span  :class="{ active: type == '现场版' }"
              @click="type = '现场版'">现场版</span>
        <span  :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'">网易出品</span>
      </p>

      <p>
        排序: <span   :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'">上升最快</span>
        <span   :class="{ active: order == '最热' }"
              @click="order = '最热'">最热</span>
        <span   :class="{ active: order == '最新' }"
              @click="order = '最新'">最新</span>
      </p>
    </div>

    <!-- mv区域 -->
    <div class="tuijianmv">
      <div class="items">
        <div class="item"     
         @click='toPlaymv(item.id)'
          v-for="(item, index) in list"
          :key="index" 
       >
                     <img v-lazy="item.cover" alt="" />

<!-- 标题 -->
          <p>{{ item.name }}</p>
          <p>{{ item.artistName }}</p>
        </div>

      
      </div>
    </div>
    <!-- 分页 -->
   <!--  :current-page="page"绑定事件给这个事件 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :limit="limit"
        :small="true"
        :page-size="10"
      >
</el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "mv",
  data() {
    return {
      property: "value",
      // 总条数
      total: 20,
    //   地区
    area:'全部',
    // 类型
    type:'全部',
    // 排序
    order:'上升最快',
    // 数量
    limit:10,
    // 偏移值
    offset:0,
    // mv数据
    list:[],
     // 页码
     page: 1,

    };
  },
  // 监听器
  watch:{
    area(){
       // 返回第一页
        this.page = 1
    this.getList()
    },
    type(){ // 返回第一页
        this.page = 1
    this.getList()

    },
    order(){ // 返回第一页
        this.page = 1
    this.getList()

    }

  },
  created(){
     this.getList()
  },

  methods:{
    //   获取mv信息
      getList(){
           axios({
          url:'https://autumnfish.cn/mv/all',
          method:'get',
          params:{
                // 排序
          order: this.order,
          // 地区
          area: this.area,
          // 类型
          type: this.type,
          // 取出数量
          limit: this.limit,
            // 分页      （页码-1）*数量
          offset: (this.page - 1) * this.limit

          }
      }).then((res) => {
        this.list = res.data.data
      // 接口有bug
      if(res.data.count){
          // 保存总条数
        this.total = res.data.count
      }
      });
      },

        // toMv(id) {
    //   this.$router.push(`/mv?id=${id}`);
    // },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      // 改变页码后重新刷新数据
       this.getList()


    },
     // 播放mv
    toPlaymv(id){
      this.$router.push('/mvs?mvid=' + id)
    }
  }
};
</script>

<style scoped>
.fenlei {
    margin: .2rem 0;
  font-size: 0.2rem;
}
.fenlei p{
    margin: .2rem .1rem;

}
/* 点击时反馈 */
.active{
    font-size: .2rem;
    color:rgb(243, 55, 55)
}


/* mv列表 */
.tuijianmv .item {
    border: .1rem solid rgb(84, 84, 84);
    /* 内阴影 */
    box-shadow: 0 .1rem .1rem inset;
  font-size: 0.2rem;
  margin: 0.5rem 0;
}
.tuijianmv .item img {
  width: 100%;
  margin: 0.02rem 0;
}


































/* 分页 */
.el-pagination{

}
</style>
