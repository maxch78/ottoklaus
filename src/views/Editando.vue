<template>
    <v-container>
        <h2 class="my-5 text-center display-3">Editando juguetes: {{nombre}}</h2>
        <div>
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

        </div>
    </v-container>
    
</template>

<script>
import {mapGetters} from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'Editando',
    props: ['id'],
    computed: {
      ...mapGetters(['enviandoCursos'])
      },
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
        }
    },
    mounted() {

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
            console.log(cursoNuevo);
            /*this.$store.dispatch('agregandoCurso', cursoNuevo).then(()=>{
                Swal.fire(
                    'Muy Bien',
                    'Juguete agregado con éxito',
                    'success'
                );
                this.reset();
            }); */
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
    }
}
</script>

<style>



</style>