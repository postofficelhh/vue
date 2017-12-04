<template>
  <div>
      <mt-field label="用户名" state="success" v-model="username"></mt-field>
      <mt-field label="邮箱" state="emailState" v-model="email"></mt-field>
      <mt-button @click="doLogin">登录</mt-button>
  </div>
</template>

<script>
export default {
    methods:{
        doLogin(){
            this.$axios.put('/users/' + this.username,{
                isLogin:true
            })
            .then(res=>{
                this.$router.push({
                    name:'music.list'
                });
            })
        }
    },
    data(){
        return {
            username:'',
            email:'',
            emailState:''
        }
    },
    watch:{
        email:function(newV){
            if(newV == 'qq@qq.com'){
                this.emailState = 'success';
            }else if(!newV.includes('@')){
                this.emailState = 'error';
            }else{
                this.emailState = 'warning';
            }
        }
    }
}
</script>

<style>

</style>
