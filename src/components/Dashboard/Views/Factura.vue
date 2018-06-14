<template id="table-user">
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
    <template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
        <!--buscador de tabla-->
            <b-col md="6" class="my-1">
                <b-form-group horizontal label="Buscar" class="mb-0">
                <b-input-group>
                    <b-form-input v-model="filter" placeholder="cliente o # de factura" />
                    <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''" class="btn-clear">Limpiar</b-btn>
                    </b-input-group-append>
                </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>
        <!-- Main table element -->
        <b-table show-empty
                stacked="md"
                :items="registers"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
        >
            <!-- opciones de la tabla -->
            <template slot-scope="row">{{registers.height }}</template>
            <template slot-scope="row">{{registers.date}}</template>
            <template slot-scope="row">{{registers.name}}</template>
            <template slot-scope="row">{{registers.gender}}</template>
            <template slot="isActive" slot-scope="row">{{(registers.gender)?'female':'male'}}</template>
            <!-- acciones -->
            <template slot="actions" slot-scope="row">
                <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1 btn fa-i fas fa-edit" variant="outline-dark" v-b-tooltip.hover title="editar factura">
                </b-button>
                <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1 btn fa-i fas fa-arrow-alt-circle-down" variant="outline-dark" v-b-tooltip.hover title="descargar factura">
                </b-button>
                <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1 btn fa-i fas fa-trash-alt" variant="outline-dark" v-b-tooltip.hover title="eliminar Factura">
                </b-button>
            </template>
        </b-table>
        <!--paginacion -->
        <b-row>
        <b-col md="6" class="my-1">
            <b-pagination align="right" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pagination-general" />
        </b-col>
        </b-row>

        <!-- Info modal -->
        <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
        <pre>{{ modalInfo.content }}</pre>
        </b-modal>

      </b-container>
     </template>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      registers: [],
      fields: [
        {key: 'height', label: '#'},
        'Fecha',
        { key: 'name', label: 'Nombre de cliente', sortable: true, sortDirection: 'desc' },
        {key: 'gender', label: 'Vendedor'},
        { key: 'isActive', label: 'Estado' },
        { key: 'mass', label: 'Precio', sortable: true, 'class': 'text-center' },
        { key: 'actions', label: 'Acciones' }
      ],
      currentPage: 1,
      perPage: 6,
      sortBy: null,
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  mounted () {
    axios
      .get('https://swapi.co/api/people/')
      .then(res => {
        console.log(res)
        this.registers = res.data.results
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
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
