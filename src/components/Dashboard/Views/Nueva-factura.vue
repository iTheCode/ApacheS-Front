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
         <b-modal id="modal1" size="lg" title="Buscar productos">
            <div class="row input">
                <input type="text" class="form-control col-6 btn-opciones" id="" placeholder="Buscar productos">
                <button type="submit" class="btn btn-outline-dark btn-opciones"><i class="icon fas fa-search"></i>Buscar</button>
            </div>
            <div class="row input-nf">
              <table class="table col-8">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Codigo</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Cant.</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Agregar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td class="td-nf"><input type="text" class="form-control col-6"></td>
                      <td class="td-nf"><input type="text" class="form-control col-10"></td>
                      <td class="td-nf"><a class="btn"><i class="fa-i fas fa-plus" v-b-tooltip.hover title="agregar producto"></i></a></td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </b-modal>
        </div>
      </div>
  </div>
  </div>
</template>
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
</style>
