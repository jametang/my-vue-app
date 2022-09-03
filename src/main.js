import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import global_ from './components/Global.vue'

// import { read, writeFileXLSX, utils} from "xlsx";

//匿名登录
import cloudbase from '@cloudbase/js-sdk';
const app = cloudbase.init({
  env: "my-vue-app-6gy9qpwhaa42ffed"
});

app
  .auth({
    persistence: "session"
  })
  .anonymousAuthProvider()
  .signIn()
  .then(() => {
    // 登录成功
    console.log("成功")
  })
  .catch((err) => {
    // 登录失败
    console.log("失败")
  });
//匿名登录结束
console.log("发起匿名登录"); // true
Vue.config.productionTip = false
// Vue.prototype.read = read; //设置全局
// Vue.prototype.writeFileXLSX = writeFileXLSX;//设置全局
// Vue.prototype.utils = utils;

Vue.prototype.GLOBAL = global_;

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
