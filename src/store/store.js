import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: [],
    user: null
  },
  getters: {
    enviandoCursos(state){
      return state.cursos;

    },
    enviandoUser(state){
     return state.user; 
    }
  },
  mutations: {
    mutandoCursos(state,cursosLocal){
      state.cursos = cursosLocal;
    },
    mutandoUserLocal(state,userData){
     state.user = userData; 
    }
  },
  actions: {
    traerCursosDB({commit}){
      firebase.firestore().collection('cursos').onSnapshot(result =>{
        let cursosLocal = [];
        result.forEach(element => {
          cursosLocal.push({
            codigo: element.data().codigo,
            nombre: element.data().nombre,
            stock:  element.data().stock,
            precio: element.data().precio,
            imagen: element.data().imagen,
          })
        });
        commit('mutandoCursos',cursosLocal);
      })
    },
    cargandoUsuario({commit},userData){
      commit('mutandoUserLocal',userData);
    },
    agregandoCurso(context, cursoNuevo){
return firebase.firestore().collection('cursos').add({...cursoNuevo});
    },
    eliminandoCurso(context, idDoc){
      return firebase.firestore().collection('cursos').doc(idDoc).delete();
    }
  },
  modules: {
  }
})
