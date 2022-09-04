import Vue from 'vue'
import Router from 'vue-router'
import homeList from '../views/homeList.vue'
import detailOrder from '../views/detailOrder.vue'
import preview from '../views/preview.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homeList',
            component: homeList
        },
        {
            path: "/order",
            name: 'detailOrder',
            component: detailOrder
        },{
            path: '/preview',
            name: 'preview',
            component: preview
        }
    ]
})