<template>
  <div>
      <router-link :to="{name:'login'}">登录</router-link>
      <mt-button type="danger" size="small" @click="exit">exit</mt-button>
      <router-link :to="{name:'music'}">音乐首页</router-link>
      <router-link :to="{name:'music.list'}">音乐列表</router-link>
        <!-- 音乐首页 -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
       methods:{
            exit(){
                this.$axios.put('users/qq',{
                    isLogin:false
                })
                .then(res=>{
                    this.$router.push({
                        name:'login'
                    });
                });
        }
       }
       
}
</script>

<style>

</style>
