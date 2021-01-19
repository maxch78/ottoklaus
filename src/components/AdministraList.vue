<template>
    <v-container>
        <div class="my-8 d-flex justify-start">
            <h3 class="my-6 text-center display-3 mx-4">Administración</h3>

        </div>
    <!-- Tabla para administrar juguetes -->
    <div class="float-none">
    </div>
    <v-data-table :headers="headers" :items="enviandoCursos" :items-per-page="5" item-key="name" class="elevation-1" :footer-props="{ showFirstLastPage: true, firstIcon: 'mdi-arrow-collapse-left', lastIcon: 'mdi-arrow-collapse-right', prevIcon: 'mdi-minus', nextIcon: 'mdi-plus'}">
        <template v-slot:item.precio="{ item }">
      <v-chip color="purple" dark>
          {{ item.precio | formatoNum }} CLP
      </v-chip>
    
    </template>
    <template v-slot:item.acciones="{ item }">
            <v-icon small class="mr-3" @click="editando(item)">
                mdi-pencil
            </v-icon>
        <v-icon small @click="eliminando(item)">
                mdi-delete
        </v-icon>
    </template>

    


    </v-data-table>

<!-- modal para registrar juguetes -->
<section class="my-auto">
<v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">Agregar Juguete</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Agregando Juguete</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="codigo" label="Código" required></v-text-field>
                <v-text-field v-model="nombre" label="Nombre Juguete" required></v-text-field>              
                <v-text-field v-model="stock" label="Stock" required></v-text-field>            
                <v-text-field v-model="precio" label="Precio" required></v-text-field>


<div class="mt-5">
  <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>

    <v-btn color="warning" @click="resetValidation">
      Reset Validation
  </v-btn>
</div>
</v-form>
          </v-container>
      </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Agregar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</section>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import Swal from 'sweetalert2';

export default {
     name: 'AdministraList',
     data() {
         return {
         valid: true,
         codigo: '',
         nombre: '',
         stock: 0,
         precio: 0,

         nombreRules: [
    v => !!v || 'nombre es requerido',
    v => (v && v.lenght >= 2) || 'Name must be less than 10 characters', 
         ],
         dialog: false,
         headers: [
          {
            text: 'Código',
            align: 'start',
            value: 'codigo',
          },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Stock', value: 'stock' },
          { text: 'Precio', value: 'precio' },
          { text: 'Acciones', value: 'acciones'},

        ],   
    }
},
    computed: {
      ...mapGetters(['enviandoCursos'])
      },
      filters: {
          formatoNum(valor){
              return new Intl.NumberFormat('cl', {style: 'currency', currency: 'CLP'}).format(valor);
          }
    },
    methods: {
      validate () {
        this.$refs.form.validate();
        if (this.$refs.form.validate()) {
            let cursoNuevo = {
                codigo: this.codigo,
                nombre: this.nombre,
                stock: this.stock,
                precio: this.precio,
            };
            this.$store.dispatch('agregandoCurso', cursoNuevo).then(()=>{
                Swal.fire(
                    'Muy Bien',
                    'Juguete agregado con éxito',
                    'success'
                )
            });
        } else {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Upps, hay errores en los datos!',
        footer: 'prueba nuevamente'
        });
    }
},
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      eliminando(item){
          console.log("eliminando", item);
          this.$store.dispatch('eliminandoCurso', item.idDoc).then(()=>{
              Swal.fire(
                    'Muy Bien',
                    'Juguete eliminado con éxito',
                    'success'
              );
          });
      },
      editando(item){
          console.log("editando", item);
          this.$router.push({name: 'Editando', params: {id: item.idDoc}});
      }
    },
}
</script>

<style>

</style>