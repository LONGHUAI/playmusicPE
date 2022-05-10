<template>
  <div >
    <!-- 头部导航栏 -->
    <div>
      <div class="toubu">
       
        <span class="iconfont" @click="daohan">&#xe623;
        <div class="daohan">
         <p>你好，我是李同学这是我的个人项目练习</p>
         <span class="waibu" @click.stop="waibu">x</span>
          

        </div>
        </span>
        <input class="sousuo" v-model="input"   placeholder="杰哥不要"  type="text">
         <span class="iconfont" @click="dianji">&#xe8b9;</span>
        <!-- <span class="iconfont ">&#xe8b9;</span> -->

      </div>
      <div class="nav">
        <span :class="{ 'nav-back': tag == '音乐' }" @click="tomusic"
          >音乐</span
        >
        <span :class="{ 'nav-back': tag == 'MV' }" @click="toMV">MV</span>
        <span :class="{ 'nav-back': tag == '专辑' }" @click="togedan"
          >专辑</span
        >
      </div>
      <router-view>
          <!-- <music></music> -->
      </router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mv from "../components/mv.vue";
import music from "../components/music.vue";
import musiclist from "../components/musiclist.vue";
import mvs from "../components/mvs.vue";
import sousuo from "../components/sousuo.vue";
import gedan from "../components/gedan.vue";



export default {
  name: 'index',

  data() {
    return {
      tag: "音乐",
      //   轮播图
      banners: [],
      // 用户输入的内容
      input:''
    };
  },
  components: {
    mv,
    mvs,
    music,
    musiclist,
    sousuo,
    gedan
  },
  created() {
          this.$router.push('/music')
  },
  methods:{
    // 提交数据，把数据带到另外一个页面
    dianji(){
        if(this.input == ''){
           this.$message({
          message: '请输入内容',
          type: 'warning'
        });
        }else{
          // 跳转的同时把数据带过去   input是随便起的名字
        this.$router.push('/sousuo?input='+this.input);
        }
    },
      tomusic(){
         this.tag = '音乐',
          this.$router.push('/music')
         
      },
      // mv
      toMV(){
         this.tag = 'MV',
          this.$router.push('/mv')
      },
      // 歌单
      togedan(){
        this.tag = '专辑',
        this.$router.push('/gedan')
      },


      // 导航
      daohan(){
        let daohan = document.querySelector('.daohan')
        daohan.style.left = '0',
        console.log('出来');
      },
      waibu(){
        let daohan = document.querySelector('.daohan')
        daohan.style.left = -3 + 'rem'
        console.log('关闭');


      }


  }
};
</script>

<style scoped>
.toubu {
  display: flex;
  justify-content: space-between;
  height: 0.5rem;
  background: #d43b33;
  align-items: center;
}
.iconfont {
  margin: 0.2rem 0.1rem;
  font-size: 0.2rem;
  color: aliceblue;
}
/* 导航 */
.nav {
  height: 0.5rem;
  /* background: #efbbb8; */
  display: flex;
  justify-content: space-around;
  font-size: 0.19rem;
}
.nav span {
  height: 0.5rem;
  line-height: 0.5rem;
  width: 0.7rem;
  text-align: center;
  box-sizing: border-box;
}
/* tab下面的显示条 */
.nav-back {
  color: #d43b33;
  border-bottom: #d43b33 solid 0.03rem;
}

/* 搜索 */
/* 点击触发 */
.sousuo{
/* width: 1rem; */
text-indent: .1rem;

position:absolute;
border-radius:.2rem;
right: .4rem;
  height: .2rem;
}

/* 导航 */
.daohan{
  position: absolute;
  width: 80%;
  left: -3rem;
  top: 0;
  height: 50%;
  z-index: 9;
  background: white;
  transition: all .5s;
  border-radius:.1rem ;
}
.daohan p{
  z-index: 10;
  color: #000000;
  font-size: .5rem;
  margin: .1rem .1rem;
  
}
.waibu{
  color: #000000;
  z-index: 11;
  position: absolute;
  right: 0;
  bottom:0;
  font-size: 1rem;
}

</style>
