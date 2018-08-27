<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/module/FilterModule.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
