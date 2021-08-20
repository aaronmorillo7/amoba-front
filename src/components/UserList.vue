<template>
    <!-- Search and Modal button  -->
    <div class="grid grid-cols-2 m-8">
        <section class="col-span-1">
        <div class="w-64">
            <div class="bg-white shadow flex rounded-lg">
            <span class="flex justify-end items-center text-gray-500 p-2">
                <i class="material-icons text-3xl text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </i>
            </span>
            <input class="rounded p-2" type="text" placeholder="Buscar Persona" v-model="keyWord" v-on:keyup="search()">
            </div>
        </div>
        </section>
        <section class="col-span-1">
            <button v-on:click="toggleModal()" class="bg-yellow-600 text-white rounded-lg p-3 float-right">Nuevo contacto</button>
        </section>
    </div>

    <div class="m-8">
        <!-- User List -->
        
        <div class="m-5 p-3 bg-white rounded-lg shadow-md" v-if="notNameFound">
            <p>No existen usuarios con {{keyWord}} en su nombre</p>
        </div>

        <div class="m-5 p-3 bg-white rounded-lg shadow-md" v-if="notIdFound">
            <p>No existe un usuario con la id {{keyId}}</p>
        </div>

        <div class="m-5 p-3 bg-white rounded-lg shadow-md" v-if="notDateFound">
            <p>No existe un usuario creado entre la fecha {{keyDateStart}} y {{keyDateEnd}}</p>
        </div>

        <ul v-if="users">

            <li v-for="target_user in users" :key="target_user.id" class="m-5 p-3 bg-white rounded-lg shadow-md">
                <form v-if="target_user.save" v-on:submit.prevent="update(target_user)">
                    <input v-model="target_user.id" name="id" type="hidden">
                    <span class="grid grid-cols-4 m-3">
                        <img class="col-span-1 rounded-full h-20 w-20"  :src="target_user.photo" alt="imagen 1">
                        <span class="w-40 col-span-1 grid grid-rows-2">
                            <input type="text" class="row-span-1 text-xl" name="name" v-model="target_user.name">

                            <button type="button" class="text-yellow-500 float-left row-span-1" v-on:click="remove(target_user)">Eliminar</button>
                        </span>

                        <textarea class="col-span-1 w-2x1 resize-none" name="description" v-model="target_user.description"></textarea>

                        <button v-if="target_user.save" type="submit" class="text-blue-600 col-span-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button>
                    </span>
                </form>

                <div v-if="!target_user.save">
                    <span class="grid grid-cols-4 m-3">
                        <img class="col-span-1 rounded-full h-20 w-20"  :src="target_user.photo" alt="imagen 1">
                        <span class="w-40 col-span-1 grid grid-rows-2">
                            <p class="row-span-1 text-xl">{{target_user.name}}</p>
                            <button type="button" class="text-yellow-500 float-left row-span-1" v-on:click="remove(target_user)">Eliminar</button>
                        </span>

                        <p class="col-span-1 w-2x1 resize-none">{{target_user.description}}</p>

                        <button v-if="!target_user.save" type="button" v-on:click="editUser(target_user)" class="text-blue-600 col-span-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>

                    </span>
                </div>

            </li>
        </ul>

        <div v-if="users.length==0" class="m-5 p-3 bg-white rounded-lg shadow-md">
            <p>No hay usuarios aun!</p>
        </div>

    </div>
    <div>
    <!-- Modal -->
    <div v-if="showModal" class="p-3 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex shadow-md">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-auto bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              Agregar nuevo contacto
            </h3>
        
          </div>
          
        <div class="w-full max-w-xs">
            <form v-on:submit.prevent="create()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST">

            <div class="mb-4">
                <div class="grid grid-cols-2 content-center">
                    <span class="mt-2 col-span-1 leading-normal text-sx ">Carga imagen <span class="text-red-500">*</span></span>
                    <div class="flex items-center justify-center border border-dashed border-gray-500 rounded-lg m-3">    
                        <label class="w-64 col-span-1 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <input type='file' accept="image/*" ref="file" class="hidden" @change="onFileChange($event)">
                        </label>
                    </div>
                </div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Nombre
                    <span class="text-red-500">*</span>
                </label>
                <input v-model="user.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" type="text" placeholder="Username" name="name">
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Descripcion
                    <span class="text-red-500">*</span>
                </label>
                <input v-model="user.description" class="shadow rounded w-full py-2 px-3 text-gray-700 mb-3" type="text" placeholder="Descripcion">
                </div>
                <div class="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button class="text-white bg-gray-400 border py-2 px-4 rounded-lg" type="button" v-on:click="toggleModal()">
                        Cerrar
                    </button>
                    <button type="submit" class="text-white bg-yellow-400 py-2 px-4 rounded-lg">
                        Guardar
                    </button>
                </div>
            </form>
            
        </div>

        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
        
    <div class="grid grid-cols-4 m-8">
        <input class="rounded p-2 m-2" type="text" placeholder="Buscar Id" v-model="keyId" v-on:keyup="searchById()">
        <div class="m-2">
            <label class="m-1" for="startDate">Fecha inicial</label>
            <input class="m-1 p-1 rounded-lg" type="date" name="startDate" v-on:change="searchByDate()" v-model="keyDateStart">
        </div>
        <div class="m-2">
            <label class="m-1" for="startDate">Fecha limite</label>
            <input class="m-1 p-1 rounded-lg" type="date" name="endDate" v-on:change="searchByDate()" v-model="keyDateEnd">
        </div>
        <button class="m-2 rounded-lg bg-yellow-600 text-white" type="button" v-on:click="resetDate()">Reiniciar fechas</button>
    </div>
    <div v-if="alertCreate" role="alert" class="h-24 w-24 bottom-0 left-0">
        <div class="fixed bottom-1 left-1 w-44 m-8 bg-green-500 text-white p-1 rounded flex">
            <p class="m-1">Usario creado</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <button class="m-1" v-on:click="resetAlerts()">X</button>
        </div>
    </div>

    <div v-if="alertUpdate" role="alert" class="h-24 w-80 bottom-0 left-0">
        <div class="fixed bottom-1 left-1 w-44 m-8 bg-yellow-500 text-white p-1 rounded flex">
            <p class="m-1">Usario actualizado</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <button class="m-1" v-on:click="resetAlerts()">X</button>
        </div>
    </div>

    <div v-if="alertDelete" role="alert" class="h-24 w-24 bottom-0 left-0">
        <div class="fixed bottom-1 left-1 w-44 m-8 bg-red-500 text-white p-1 rounded flex">
            <p class="m-1">Usario borrado</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <button class="m-1" v-on:click="resetAlerts()">X</button>
        </div>
    </div>

    <PaginationBar></PaginationBar>

  </div>
</template>

<script>
import Axios from '../main'

export default {
    name: 'UserList',
    data: function(){
        return {
            users: [],
            showModal: false, 
            File: [],
            user:{
                id: null,
                name: "",
                description: "",
                photo: null, 
                save: false
            },
            photo: null,
            imageFile: null,
            save: false,
            keyWord: '',
            notNameFound: false,
            keyId: null,
            notIdFound: false,
            keyDateStart: null,
            keyDateEnd: null,
            notDateFound: false,
            alertCreate: false,
            alertUpdate: false,
            alertDelete: false
        }
    },
    methods: {
        show(){
            Axios.get('/user').then((response) => {
                var users = []
                response.data.data.users.forEach(user => {
                    const dataUser = {
                        'id' : user.id,
                        'name': user.first_name + ' ' + user.last_name,
                        'description': user.description,
                        'photo' : user.photo,
                        'created_at': user.created_at
                    }
                    users.push(dataUser)
                });
                this.users = users
                this.notNameFound = false
                this.notIdFound = false
                this.notDateFound = false
            })
        },
        toggleModal: function(){
            this.showModal = !this.showModal;
        },
        create(){
            const predata = {
                'name' : this.user.name,
                'description' : this.user.description,
                'photo': this.photo
            }
            console.log(predata)
            const name = predata.name.split(' ');
            const data ={
                'first_name': name[0],
                'last_name': name[1]? name[1] : "",
                'description': predata.description,
                'photo': predata.photo
            }
            console.log(data)
            Axios.post('/user/guardar', data).then((response) => {
                console.log(response.data)
                this.alertCreate = response.data.success ? true : false
                this.show()
                this.toggleModal()
            })
            
        },
        update(target_user){
            console.log(target_user)
            const predata = {
                'id': target_user.id,
                'name' : target_user.name,
                'description' : target_user.description
            }
            const name = predata.name.split(' ');
            const data ={
                'id': predata.id,
                'first_name': name[0],
                'last_name': name[1]? name[1] : "",
                'description': predata.description
            }
            console.log(data)
            Axios.post('/user/actualizar', data).then((response) => { 
                console.log(response) 
                this.show()    
                this.alertUpdate =  response.data.success ? true : false
            })
            
        },
        remove(target_user){
            console.log(target_user)
            const id = target_user.id
            Axios.delete('/user/borrar' + '/' + id).then((response) => { 
                console.log(response) 
                this.show()
                this.alertDelete = response.data.success? true : flase
            })         
        },
        onFileChange(e) {
            this.imageFile = this.$refs.file.files[0];
            const imageReader = new FileReader()
            imageReader.readAsDataURL(this.imageFile)
            console.log(imageReader)
            imageReader.onload = e =>{
                    this.photo = e.target.result;
                };
        },
        editUser(target_user){
            if(target_user.save){
                target_user.save = false
            }else{
                target_user.save = true
            }
        },
        search(){
            if(this.keyWord != '' || this.keyWord != ""){
                this.users = this.users.filter( user => {
                    return user.name.includes(this.keyWord)
                } )
                this.notNameFound = this.users.length == 0 ? true : false
                
            }else{
                this.show()
                this.notNameFound = this.users.length == 0 ? true : false
            }
        },
        searchById(){
            if(this.keyId != '' || this.keyId != ""){
                this.users = this.users.filter( user => {
                    return user.id == this.keyId
                } )
                this.notIdFound = this.users.length == 0 ? true : false
                
            }else{
                this.show()
                this.notIdFound = this.users.length == 0 ? true : false
            }
        },
        searchByDate(){
            if(this.keyDateStart != null && this.keyDateEnd != null){
                this.users = this.users.filter( user => {
                    if(user.created_at < this.keyDateEnd && user.created_at > this.keyDateStart){
                        return true
                    }
                    return false
                } )
                this.notDateFound = this.users.length == 0 ? true : false
                
            }else{
                this.show()
                this.notDateFound = this.users.length == 0 ? true : false
            }
        },
        resetDate(){
            this.keyDateStart = null
            this.keyDateEnd = null
            this.show()
        },
        resetAlerts(){
            this.alertCreate = false
            this.alertUpdate = false
            this.alertDelete = false
        }

    },
    mounted() {
        this.show()
    }
}
</script>
