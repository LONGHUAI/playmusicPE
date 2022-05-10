<template>
  <div>
<index></index>
<!--  @click="playmusic" -->
<div class="play-music">
  <!-- 父子组件 -->
<!-- <img v-lazy="musicpic" alt="" @showCityName='add' :chuangdi='musicname'> -->
<img class="musicimg" v-lazy="musicpic" alt="">

<div class="bofan">
  <span>{{musicname}}</span>
<span @click="bofan" id="bofan">播放</span>
<!-- <span>{{musicname}}</span> -->


</div>
</div>
 <!-- @play='play'  -->
<audio :src="musicurl" autoplay controls></audio>
  </div>
   
  
</template>

<script>
import index from '../src/components/index.vue'

export default {

  name: 'App',
   // 注册
 components:{
   index
 },
 data() {
   return {
    //  音乐头像
     musicpic:'http://p3.music.126.net/B97kRUQKbbBoKR2Ef_XEdQ==/109951165827794248.jpg',
    //  音乐名
    musicname:'你看到了我DJ',
    //  音乐链接
     musicurl: '',
   };
 },
// created(){
// this.bofan()
// },
watch:{
musicurl(){
  this.bofan()
  bofan.innerHTML = '暂停'    
 
}
},
 methods:{
  // //  父子组件通信
  //  add(names){
  //    this.musicname = names
  //   //  console.log(musicname);
  //  }
  bofan(){
    let bofan = document.getElementById('bofan')
    let  audio = document.querySelector('audio')    
        if (audio.paused) {
            audio.play(); // 播放
            bofan.innerHTML = '暂停'  
        } else {
            audio.pause(); // 暂停
            bofan.innerHTML = '播放'
        }
    }
  }
 }

</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html{
  font-size: 26.6667vw;
}
audio{
  display: none;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
 
}
/* 美化播放条 */
.play-music{
  border-top: .01rem solid rgb(135, 135, 135) ;
  background:  #ffffff;
 position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: .8rem;
  font-size: .2rem;
  display: flex;
  justify-content:space-between;
}
/* 旋转动画 */
@keyframes turn {
    0% {
        transform: rotate(0deg);
    }

    20% {
        transform: rotate(72deg);
    }

    40% {
        transform: rotate(144deg);
    }

    60% {
        transform: rotate(216deg);
    }

    80% {
        transform: rotate(288deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
.play-music img{
  border-radius: 50%;
  height: .5rem;
  /* 单独给子元素设弹性布局 */
 align-self:center;
 margin-left: .1rem;
 /* linear是平滑  infinite是完成动画是否重复*/
   animation: turn 10s linear infinite;
}
.play-music span{
  
  height: .5rem;
  /* 单独给子元素设弹性布局 */
line-height: .9rem;
margin-right: .1rem;
}
</style>
