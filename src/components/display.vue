<template>
  <svg fill="black" style="margin: auto; width:600px; height:300px">
    <rect width="600" height="300"/>
       <path stroke="red" stroke-width="3"
            :d="path"/>
	    <text x="50%" y="25" fill="red">{{data}}</text>
   </svg>
</template>
<script>
export default {
  name: 'display',
  props: ['data'],
  mounted () {
    console.log('display: mounted!')
  },
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    path () {
      // just as a workaround for now:
      const lowpassOffset = 250
      // the main line:
      const mainLine = 100

      // the data as length is a ratio of this.data
      // and the number of possible values times the available space
      // (gotta simplify it, for sure)
      let data = (this.data / (10000 - 50)) * 250

      // lengths added and stringified into a path
      let line = 'M 0,5 H' + (lowpassOffset + mainLine + data) + ' V 300'
      return line
    }
  },
  watch: {
    data () {
      if (this.data % 100 == 0) {
        console.log('data changed! ', this.data)
      }
    }
  }
}
</script>

 <style scoped>
 path {
   display: inline;
 }
 </style>
