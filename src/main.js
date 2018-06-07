// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import decode from 'jwt-decode'
import Vuex from 'vuex'
import qs from 'qs'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
const store = new Vuex.Store({
  state: {
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: 'http://api.a-pachestore.com/v1/auth/obtain_token/',
      refreshJWT: 'http://api.a-pachestore.com/v1/auth/refresh_token/'
    }
  },
  mutations: {
    updateToken (state, newToken) {
      localStorage.setItem('t', newToken)
      state.jwt = newToken
    },
    removeToken (state) {
      localStorage.removeItem('t')
      state.jwt = null
    }
  },
  actions: {
    obtainToken (action, payload) {
      console.log('executing obtainJWT')
      axios.post(this.state.endpoints.obtainJWT, qs.stringify(payload), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
          this.commit('updateToken', response.data.token)
          window.location = '/DashboardLayout'
        })
        .catch((error) => {
          console.log(error)
          window.location = '/login'
        })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }

      axios.post(this.state.endpoints.refreshJWT, qs.stringify(payload))
        .then((response) => {
          this.commit('updateToken', response.data.token)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    inspectToken () {
      const token = this.state.jwt
      if (token) {
        const decoded = decode(token)
        const exp = decoded.exp
        const origIat = decode.orig_iat

        if ((Date.now() / 1000) > exp) {
          // IF TOKEN EXPIRED THEN SEND TO LOGIN PAGE
          router.push('login')
        } else if ((Date.now() / 1000) > (exp - 1800) && (Date.now() / 1000) < (origIat + 604800)) {
          // IF TOKEN EXPIRE IN LESS THAN 30MN BUT STILL IN REFRESH PERIOD THEN REFRESH
          this.dispatch('refreshToken')
        }
      } else {
        // NO TOKEN THEN SEND TO LOGIN PAGE
        router.push('login')
      }
    }
  }
})
export { store }
