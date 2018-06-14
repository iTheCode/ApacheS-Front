<template>
<div class="card">
  <div class="card-header">
      <h5><i class="icon fas fa-edit"></i>Nueva Factura</h5>
  </div>
  <div class="card-body">
      <div class="row">
        <div class="col-4">
            <div class="row input-nf">
              <label for="cliente" class="col-4 col-form-label">Cliente</label>
              <input type="text" class="form-control form-control-nf" id="cliente" placeholder="cliente">
            </div>
            <div class="row input-nf">
              <label for="vendedor" class="col-4 col-form-label">Vendedor</label>
              <label for="vendedor" class="col-7 bg-light text-muted form-control">renzo ipanaque</label>
            </div>
        </div>
        <div class="col-4">
            <div class="row input-nf">
              <label for="telefono" class="col-4 col-form-label">Telefono</label>
              <input type="text" class="form-control form-control-nf" id="telefono" placeholder="telefono">
            </div>
            <div class="row input-nf">
              <label for="fecha" class="col-4 col-form-label">Fecha</label>
              <input type="text" class="form-control form-control-nf" id="fecha" placeholder="fecha">
            </div>
        </div>
        <div class="col-4">
          <div class="row input-nf">
              <label for="email" class="col-4 col-form-label">Email</label>
              <input type="text" class="form-control form-control-nf" id="email" placeholder="Email">
            </div>
            <div class="row input-nf">
              <label for="pago" class="col-4 col-form-label">pago</label>
              <select class="form-control form-control-nf" id="exampleFormControlSelect1">
                <option>Efectivo</option>
                <option>Cheque</option>
                <option>Transferencia bancaria</option>
              </select>
            </div>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-auto">
          <b-btn type="button" class="btn btn-outline-dark btn-opciones" v-b-modal.modal1><i class="icon fas fa-plus"></i>Agregar productos</b-btn>
        <button type="button" class="btn btn-outline-dark btn-opciones"><i class="icon fas fa-print"></i>Imprimir</button>

            <!-- INICIO DEL MODAL-->
          <b-modal id="modal1" size="lg" title="Buscar productos" hide-footer>
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
                  <template slot-scope="row">{{registers.name}}</template>
                  <template slot="cantidad" slot-scope="row">
                    <b-form-input v-model="cantidad" type="text" class="form-control-cantidad"></b-form-input>
                  </template>
                  <template slot="isActive" slot-scope="row">{{registers.mass}}</template>
                  <!-- acciones -->
                  <template slot="actions" slot-scope="row">
                      <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                      <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1 btn fa-i fas fa-edit" variant="outline-dark" v-b-tooltip.hover title="agregar producto">
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
          </b-modal>
        </div>
      </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      cantidad: '1',
      registers: [],
      fields: [
        {key: 'height', label: 'codigo'},
        { key: 'name', label: 'producto', sortable: true, sortDirection: 'desc' },
        {key: 'cantidad', label: 'cantidad'},
        { key: 'mass', label: 'precio' },
        { key: 'actions', label: 'Acciones' }
      ],
      currentPage: 1,
      perPage: 5,
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
.input-nf{
  display: flex;
  margin-bottom: 1rem;
}
.form-control-nf{
  width: 220px;
}
.btn-opciones{
  margin-left: 1rem;
}
.td-nf{
  width: 130px;
}
.form-control-cantidad{
  width: 50px;
}
</style>
