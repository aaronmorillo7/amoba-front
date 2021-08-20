<template>
    <div class="m-8">
        <button class="w-36 float-right rounded-full border border-black text-gray-800 rounded-lg inline-flex items-center">
            <span class="m-1 w-28 text-xs">Siguiente Página</span>
            <span class="ml-1 rounded-full bg-yellow-400 text-black">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            </span>
        </button>
    </div>
</template>

<script>

export default {
    name: 'PaginationBar',
    data: function(){
        return{
            list: ['Pedro', 'Maria']
        }
    },
    components: {
    },
    methods:{
        
    }
}
</script>
<style lang="css">
    ul, li{
        list-style: none;
    }
    #wrapper{
        width: 900px;
        margin: 20px auto;
    }
    #pagination-data-container{
        margin-top: 5px;
    }
        #pagination-data-container ul{
        padding: 0;
        margin: 0;
    }
    #pagination-data-container li{
        margin-bottom: 5px;
        padding: 5px 10px;
        background: #eee;
        color: #666;
    }
</style>
