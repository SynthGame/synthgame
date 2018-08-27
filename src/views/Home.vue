<template>
  <div class="level">
    <FilterModule />
    <FilterModule />
    <FilterModule />
  </div>
</template>

<script>
// @ is an alias to /src
import FilterModule from '@/components/module/FilterModule.vue'

export default {
  name: 'home',
  components: {
    FilterModule
  }
}
</script>
