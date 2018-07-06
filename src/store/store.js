import Vue from 'vue'
import decode from 'jwt-decode'
import axios from 'axios'
import qs from 'qs'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jwt: localStorage.getItem('t'),
    user: localStorage.getItem('user'),

    endpoints: {
      obtainJWT: 'http://api.a-pachestore.com/v1/auth/obtain_token/',
      refreshJWT: 'http://api.a-pachestore.com/v1/auth/refresh_token/'
    }
  },
  mutations: {
    updateToken (state, newToken) {
      localStorage.setItem('t', newToken.token)
      localStorage.setItem('user', newToken.user)
      state.jwt = newToken.token
      state.user = newToken.user
    },
    removeToken (state) {
      localStorage.removeItem('t')
      localStorage.removeItem('user')
      state.jwt = null
      state.user = null
    }
  },
  actions: {
    obtainToken (action, payload) {
      console.log('executing obtainJWT')
      axios.post(this.state.endpoints.obtainJWT, qs.stringify(payload), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
          this.commit('updateToken', { 'token': response.data.token, 'user': payload.username })
          location.reload()
        })
        .catch((error) => {
          alert('Se ha detectado un error, porfavor ingrese los datos correctamente.')
          console.log(error)
          router.push('login')
        })
    },
    refreshToken () {
      const payload = {
        token: this.state.jwt
      }

      axios.post(this.state.endpoints.refreshJWT, qs.stringify(payload))
        .then((response) => {
          this.commit('updateToken', { 'token': response.data.token, 'user': this.state.user })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    inspectToken () {
      const token = this.state.jwt
      console.log('inspectToken')
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
        } else {
          // window.location = '/DashboardLayout'
          router.push('facturas')
        }
      } else {
        // NO TOKEN THEN SEND TO LOGIN PAGE
        router.push('login')
      }
    },
    closeToken () {
      this.commit('removeToken')
      router.push('login')
    }
  }
})
export default store
