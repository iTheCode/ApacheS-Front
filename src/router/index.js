import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import bNav from 'bootstrap-vue/es/components/nav/nav'
import DashboardLayout from '@/components/Dashboard/Layout/DashboardLayout'
import Factura from '@/components/Dashboard/Views/Factura'
import Inventario from '@/components/Dashboard/Views/Inventario'
import Proveedores from '@/components/Dashboard/Views/Proveedores'
import Usuario from '@/components/Dashboard/Views/Usuario'
import Nuevafactura from '@/components/Dashboard/Views/Nueva-factura'
import { Modal } from 'bootstrap-vue/es/components'
Vue.use(Modal)
Vue.component('b-nav', bNav)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/DashboardLayout',
      name: 'DashboardLayout',
      component: DashboardLayout,
      children: [
        { path: '/Factura', component: Factura },
        { path: '/Inventario', component: Inventario },
        { path: '/Proveedores', component: Proveedores },
        { path: '/Usuario', component: Usuario },
        { path: '/Nueva-factura', component: Nuevafactura }
      ]
    }
  ]
})
