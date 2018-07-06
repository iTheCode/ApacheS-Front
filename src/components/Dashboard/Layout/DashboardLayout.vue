<template>
  <div class="container-fluid">
    <div class="row">
      <!-- menu lateral -->
      <div class="col-2 bg-dark dash ">
        <nav class="nav flex-column">
          <img class="logo" src="https://scontent.flim16-3.fna.fbcdn.net/v/t1.0-9/19225885_1526013140784027_2489075820232323471_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFRxcicAP17xhBJPzf67HH_K1Ls_gzSw-QZoRlib0emQq6xSIvAqWlWUjZM-bU6el_vbDoXA23T8DA9NwVNuUHW9Ta8fPTojnUp4JUddL7Ngw&oh=76c777c42cb0463b3a5cf7a9675decc1&oe=5B5476A1"/>
          <a class="nav-link">
            <router-link to="/facturas" class="my-sm-0 nav-link nav-link2">
            <i class="icon fas fa-file-alt"></i>FACTURA
            </router-link>
            <ul class="nav flex-column nav-sub">
              <li class="nav-item nav-sub__item">
                  <a class="nav-link">
                    <router-link to="/nueva-factura" class="nav-link nav-sub__link">
                      Nueva Factura
                    </router-link>
                  </a>
              </li>
              <li class="nav-item nav-sub__item">
                  <a class="nav-link">
                    <router-link to="/facturas" class="nav-link nav-sub__link">
                      Registro
                    </router-link>
                  </a>
              </li>
            </ul>
          </a>
          <a class="nav-link">
            <router-link to="/inventarios" class="my-sm-0 nav-link nav-link2">
           <i class="icon fas fa-box-open"></i>INVENTARIO
            </router-link>
          </a>
          <a class="nav-link">
            <router-link to="/clientes" class="my-sm-0 nav-link nav-link2">
            <i class="icon fas fa-user"></i>CLIENTE
            </router-link>
          </a>
          <a class="nav-link">
            <router-link to="/proveedores" class="my-sm-0 nav-link nav-link2">
            <i class="icon fas fa-user-tie"></i>PROVEEDOR
            </router-link>
          </a>
        </nav>
      </div>
      <!-- menu top -->
      <div class="col-10 nav-top">
        <nav class="navbar navbar-light nav-top2">
          <a class="navbar-brand text-warning title">Apache Store</a>
          <form class="form-inline">
            <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
            <i class="icon-user far fa-user-circle text-warning mr-1"></i>
            <label for="" class="bg-dark text-muted text-warning mr-4">{{ this.$store.state.user }}</label>
            <button class="btn btn-outline-warning my-2 my-sm-0"  @click="logout()">Salir</button>
          </form>
        </nav>
        <!-- content -->
        <div class="col content">
        <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
/*menu top*/
.nav-top{
  padding: 0;
  height: 56px;
}
.nav-top2{
background-color: rgba(52,58,64,1);
}
.title{font-family: 'Open Sans', sans-serif;}
.icon-user{
  font-size: 1.6rem;
}
/*menu lateral*/
.logo{
 margin: 1rem auto;
  width: 100px;
  height: 100px;
}
    /*menu lateral principal*/
.dash{
  height: 100vh;
}
.nav-link2{
  color:#ffc107;
  font-family: 'Roboto', sans-serif;
  border-bottom:.5px solid #ffc107;
}
.nav-link2:hover{
  border-radius: 8px;
  color: #212529;
 background-color: rgba(255, 193, 7,.5);
    transition: all .5s ease-out;
}
.router-link-active{
  border-radius: 8px;
  color: #000 !important;
 background-color: #ffc107;
}
    /*menu lateral submenu*/
.nav-sub{
  display: none;
}
.nav-sub__item{
  color:#ffc107;
}
.nav-sub__link{
   color:#ffc107;
}
.nav-sub__link:hover{
border-radius: 8px;
  color: #212529;
 background-color: rgba(255, 193, 7,.5);
   transition: all .5s ease-out;
}
.nav-link:hover .nav-sub{
  display: block;
}
/*iconos*/
.icon{
margin-right: 15px;
}
/* content*/
.content{
  padding: 0;
}
</style>
<script>
export default {
  name: 'dashboardlayout',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('closeToken')
    }
  }
}
</script>
