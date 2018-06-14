import axios from 'axios'
import store from './store.js'

const apacheAPI = axios.create({
  baseURL: 'http://api.a-pachestore.com/v1/',
  headers: {
    Authorization: 'JWT ' + store.state.jwt + ''
  }
})
export default apacheAPI
