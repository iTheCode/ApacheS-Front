<template>
  <div class="container-fluid login">
    <div class="row row-login">
      <div class="col-3">
        <div class="card card-login">
          <div class="card-body">
              <img src="../assets/img/user.png" class ="logo-user">
              <form class="form form-login" id="login">
                  <div class="form-group col">
                    <label for="" class="label-login">Usuario</label>
                    <input type="email" class="form-control" id="username" v-model="input.username" aria-describedby="emailHelp" placeholder="">
                  </div>
                  <div class="form-group col">
                    <label for="" class="label-login">Contraseña</label>
                    <input type="password" class="form-control" id="password" v-model="input.password" placeholder="">
                  </div>
                  <div class="form-group form-check check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label label-login" for="">Recordar</label>
                  </div>
                  <b-link>
                     <button type="submit" class="btn btn-outline-warning check" v-on:click="login()">Entrar</button>
                  </b-link>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
// estilos del css
<style>
.login{
  background-image: url('../assets/img/background2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}
.row-login{
  height: 100vh;
  align-content: center;
  justify-content: center;
}
.card-login{
  background-image: url('../assets/img/background2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
    border: 1px solid #ffc107;
}
.logo-user{
  width: 100px;
  display:block;
  margin:auto;
}
.label-login{
color: #ffc107;
}
.form-login{
margin-left: 0;
}
/* estilo general*/
.form-control:focus{
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7,.25);
}
.check{
  margin-left: 20px;
}
</style>
<script>
import { store } from '../main.js'
export default {
  name: 'login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      var credentials = {
        username: this.input.username,
        password: this.input.password
      }
      if (this.input.username !== '' && this.input.password !== '') {
        store.dispatch('obtainToken', credentials)
      } else {
        console.log('error')
      }
    }
  }
}
</script>
