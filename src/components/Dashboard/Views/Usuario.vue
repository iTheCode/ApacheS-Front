<template id="table-user">
<div class="card">
  <div class="card-header">
      <h5><i class="icon fas fa-search"></i>Buscar Cliente</h5>
        <b-button class="btn btn-light" v-b-modal.agregar>
            <i class="icon fas fa-plus"></i>Nuevo Cliente
        </b-button>
  </div>
  <div class="card-body">
    <template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
        <!--buscador de tabla-->
            <b-col md="6" class="my-1">
                <b-form-group horizontal label="Buscar" class="mb-0">
                <b-input-group>
                    <b-form-input v-model="filter" placeholder="Nombre Del Cliente" />
                    <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''" class="btn-clear">Limpiar</b-btn>
                    </b-input-group-append>
                </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <transition name="fade">
            <p class="alert alert-success" v-if="errorMessage">
                {{ errorMessage }}
                <i class="material-icons prefix">error</i>
            </p>
            <p class="alert alert-danger" v-if="successMessage">
                {{ successMessage }}
                <i class="material-icons prefix">check_circle</i>
            </p>
        </transition>
        <!-- Main table element -->
        <b-table show-empty
                stacked="md"
                :items="registers"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                @filtered="onFiltered"
        >
            <!-- opciones de la tabla -->
             <template slot-scope="row">{{registers.id}}</template>
            <template slot-scope="row">{{registers.first_name}}</template>
            <template slot-scope="row">{{registers.dni}}</template>
            <template slot-scope="row">{{registers.phone}}</template>
            <!-- acciones -->
            <template slot="actions" slot-scope="registers">
                <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                <b-button size="sm" @click="getClient(registers.index)" class="mr-1 btn fa-i fas fa-edit" variant="outline-dark" v-b-modal.editar v-b-tooltip.hover title="editar factura">
                </b-button>
                <b-button size="sm" @click="deleteConfirm(registers.index)" class="mr-1 btn fa-i fas fa-trash-alt" variant="outline-dark" v-b-modal.eliminar v-b-tooltip.hover title="eliminar Factura">
                </b-button>
            </template>
        </b-table>
        <!--paginacion -->
        <b-row>
        <b-col md="6" class="my-1">
            <b-pagination align="right" :total-rows="20" :per-page="perPage" v-model="currentPage" class="my-0 pagination-general" />
        </b-col>
        </b-row>
      </b-container>
     </template>
    </div>
    <!-- model de agregar -->
    <b-modal hide-footer id="agregar" title="Agregar Cliente">
        <form @submit.prevent="createClient">
            <b-form-group horizontal
                            :label-cols="2"
                            label="Nombre"
                            >
                <b-form-input name="first_
                
                name" placeholder="nombre" required></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                            :label-cols="2"
                            label="Apellido"
                            >
                <b-form-input name="last_name" placeholder="apellido" required></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                            :label-cols="2"
                            label="DNI"
                            >
                <b-form-input name="dni" placeholder="DNI"></b-form-input>
            </b-form-group>
             <b-form-group horizontal
                            :label-cols="2"
                            label="celular"
                            >
                <b-form-input name="phone" placeholder="celular"></b-form-input>
            </b-form-group>
          <div class="d-flex justify-content-end">
            <b-btn class="" @click="createClient" variant="dark">OK</b-btn>
            <input v-model="confirmDialog.id" name="id" type="hidden" required>
          </div>
        </form>
    </b-modal>
    <!-- model de editar -->
    <b-modal hide-footer id="editar" title="Editar Cliente" ref="editDialog" stacked="md" :item="editDialog">
        <form @submit.prevent="updateRegistro">
            <b-form-group horizontal
                            :label-cols="2"
                            label="Nombre"
                            >
                <b-form-input v-model="editDialog.first_name" name="name"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                            :label-cols="2"
                            label="DNI"
                            >
                <b-form-input v-model="editDialog.dni" name="dni"></b-form-input>
            </b-form-group>
             <b-form-group horizontal
                            :label-cols="2"
                            label="celular"
                            >
                <b-form-input v-model="editDialog.phone" name="phone"></b-form-input>
            </b-form-group>
          <div class="d-flex justify-content-end">
            <b-btn class="" variant="dark">Guardar</b-btn>
            <input v-model="confirmDialog.id" name="id" type="hidden" required>
          </div>
        </form>
    </b-modal>
    <!-- model de eliminar -->
    <b-modal hide-footer id="eliminar" title="eliminar cliente" ref="confirmDialog" stacked="md" :item="confirmDialog">
        <form @submit.prevent="deleteStudent">
            <p class="my-4">¿Estás seguro de eliminar al cliente: <b>{{confirmDialog.first_name}}</b>.</p>
        <div class="d-flex justify-content-end">
          <b-btn class="" variant="dark" @click="deleteClient(registers.index)">OK</b-btn>
          <input v-model="confirmDialog.id" name="id" type="hidden" required>
        </div>
        </form>
    </b-modal>
</div>
</template>
<script>
import qs from 'qs'
const registers = []
export default {
  data () {
    return {
      registers: registers,
      confirmDialog: [],
      editDialog: [],
      fields: [
        {key: 'id', label: '#'},
        { key: 'first_name', label: 'Nombre de cliente' },
        {key: 'dni', label: 'DNI'},
        { key: 'phone', label: 'Celular' },
        { key: 'actions', label: 'Acciones' }
      ],
      currentPage: 1,
      perPage: 6,
      filter: null,
      errorMessage: '',
      totalRows: registers.length,
      successMessage: '',
      activeRegistro: {}
    }
  },
  mounted () {
    this.$apacheAPI.get('client/')
      .then(res => {
        this.registers = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item.name)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getClient (index) {
      this.$apacheAPI.get('client/' + this.registers[index].id + '/')
        .then(res => {
          this.editDialog = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createClient () {
      this.$apacheAPI.post('client/add/')
        .then(res => {
          console.log(res)
        })
    },
    updateRegister (e) {
      var obj = {'name': this.name, 'dni': this.dni, 'phone': this.phone}
      // console.log(obj)
      var strngObj = qs.stringify(obj)
      console.log(this.id)
      console.log(strngObj)
      this.$apacheAPI.put('client/', this.id,
        strngObj, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(res => {
          this.setMessages(res)
        })
    },
    deleteConfirm (index) {
      this.$apacheAPI.get('client/' + this.registers[index].id + '/')
        .then(res => {
          this.confirmDialog = res.data
          console.log(this.confirmDialog)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteClient (index) {
      // this.$apacheAPI.delete('client/' + this.registers[index])
      //   .then(res => {
      //     this.confirmDialog = res.data
      //     console.log(this.confirmDialog)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
      this.$apacheAPI.delete('client/' + this.id)
        .then(res => {
          this.registers.splice(index, 1)
        })
    },
    setMessages (res) {
      if (res.data.error) {
        this.errorMessage = res.data.message
      } else {
        this.successMessage = res.data.message
      }

      setTimeout(() => {
        this.errorMessage = false
        this.successMessage = false
      }, 2000)
    }
  }
}
</script>

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
.btn-clear:disabled{
    color:#ffd351;
    background-color: #707579;
}
.btn-clear{
    background: #343a40;
    color:#ffc107;
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
/* Estilo general de paginacion*/
.page-item.active .page-link{
  background-color: #343a40;
  border: 1px solid #ffc107;
  color:#ffc107;
}
.page-link{
  color:#000;
}
.page-link:hover{
  color:#000;
}
</style>
