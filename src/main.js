import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import global_ from './components/Global'

// import { read, writeFileXLSX, utils} from "xlsx";

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
