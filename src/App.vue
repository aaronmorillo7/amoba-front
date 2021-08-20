<template>
  <Header></Header>
  <UserList></UserList>
  <PaginationBar></PaginationBar>
</template>

<script>
import Header from './components/Header.vue'
import UserList from './components/UserList.vue'
import PaginationBar from './components/Pagination.vue'

export default {
  name: 'Main',
  components: {
    Header,
    UserList,
    PaginationBar
  }
}
</script>

<style>
body{
  background: #BEBEBE;
}
</style>
