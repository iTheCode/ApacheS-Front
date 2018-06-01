<template>
<div class="card">
  <div class="card-header">
      <h5><i class="icon fas fa-search"></i>Buscar factura</h5>
      <a href="#" class="">
          <router-link to="/Nueva-factura" class="btn btn-light">
            <i class="icon fas fa-plus"></i>Nueva factura
            </router-link>
      </a>
  </div>
  <div class="card-body">
      <div class="card-buscar">
          <h5 class="card-title">cliente o # de factura</h5>
          <input type="text" class="form-control form-control-factura" placeholder="cliente o # de factura" aria-label="cliente o # de factura" aria-describedby="basic-addon1">
          <button type="button" class="btn btn-outline-dark"><i class="icon fas fa-search"></i>buscar</button>
      </div>
    <table class="table" id="register">
  <thead class="thead-dark tr">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Fecha</th>
      <th scope="col">cliente</th>
      <th scope="col">Vendedor</th>
      <th scope="col">Estado</th>
      <th scope="col">Total</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <Register></Register>
  <tbody>
    <tr v-for="register in registers" :key="register">
      <th scope="row">1</th>
      <td>12-01-12</td>
      <td>{{register.name}}</td>
      <td>@mdo</td>
      <td><p class="btn-estado bg-success">Pagada</p></td>
      <td>$100.00</td>
      <td class="factura-td">
          <div class="factura-acciones">
              <a> <i class="btn fa-i fas fa-edit" v-b-tooltip.hover title="editar factura"></i></a>
              <a> <i class="btn fa-i fas fa-arrow-alt-circle-down" v-b-tooltip.hover title="descargar factura"></i></a>
              <a> <i class="btn fa-i fas fa-trash-alt" v-b-tooltip.hover title="eliminar Factura"></i></a>
          </div>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</div>
</template>
<style>
/* estilos del card factura - general*/
.card{
    border: none;
    border-radius: none;
}
.card-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(52,58,64,.5);
}
/*estilos card factura - individual*/
.form-control-factura{
    width: 40%;
     margin-right: 20px;
}
.card-buscar{
    display: flex;
    align-items: center;
}
.card-title{
    line-height: 0;
    padding-top: 10px;
    margin-right: 20px;
}
.table{
    margin-top: 20px;
}
.factura-td{
    width: 160px;
}
.btn-estado{
    margin: 0;
    padding: 0;
    font-size: .8rem;
    font-family: 'Roboto', sans-serif;
    width: 60px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
}
.factura-acciones{
    width: 130px;
}
.fa-i{
  width: auto;
  padding: .2rem;
  border: 1px solid #000;
}
.fa-i:hover{
 background: #e2e6ea;
}
</style>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      registers: []
    }
  },
  mounted () {
    axios
      .get('https://swapi.co/api/people/')
      .then(res => {
        console.log(res)
        this.registers = res.data.results
      })
  }
}
</script>
