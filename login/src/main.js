import Vue from 'vue';
import VueRouter from 'vue-router';
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
import Axios from 'axios';

import App from './components/App.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Music from './components/Music.vue';
import List from './components/List.vue';

//安装插件
Vue.use(VueRouter);
Vue.use(MintUi);
Vue.prototype.$axios = Axios;

//拦截器
Axios.interceptors.request.use(function (config) {
    MintUi.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function (config) {
    MintUi.Indicator.close();
    return config;
});

//baseURL
Axios.defaults.baseURL ='http://localhost:3000/';

let router = new VueRouter();

router.addRoutes([
    { name:'home',path:'/home',component:Home,
        children:[
            {
                name:'login',path:'/login',component: Login
            },
            {
                name:'music',path:'/music',component:Music,meta:{ check:true },
                children:[
                    { name:'music.list',path:'list',component:List }
                ]
                
            }
        ]
    }
]);

//全局钩子
router.beforeEach((to,from,next)=>{
    console.log(to);
    let checkLogin = false;
    to.matched.forEach(ele=>{
        if(ele.meta.check){
            checkLogin = true;
        }
    });

    //发送请求
    if(checkLogin){
        Axios.get('/users/qq')
        .then(res=>{
            if(res.data.isLogin){
                return next();
            }
            //如果没有登录的娿提示登录
            MintUi.Toast({
                message:'要登录哦~',
                position:'middle',
                duration:3000
            });
            next({
                name:login
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }else{
        next();
    }

});
    





new Vue({
    el:'#app',
    render:c=>c(App),
    router
})