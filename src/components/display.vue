<template>
  <svg fill="black" style="margin: auto">
    <rect width="300" height="150"/>
      <!-- <line :points="calculatePoints" style="fill:white;stroke:red;stroke-width:4"/> -->
      <!-- <line x1="0" x2="100" :y1="150-data" :y2="150-data" style="stroke:rgb(255,0,0);stroke-width:2"/> -->

      <path stroke="red" stroke-width="3"
            :d="lineDimentions"/>
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
  methods: {
    calucatePoints () {
      let startingPoint = {}
    }
  },
  computed: {
    lineDimentions () {
      // do a curve point! C300,5 300,11 300,20
      // as of now:
      let data = this.data * 2
      let line = 'M0,5 H ' + data + 'C' + data + ',5 ' + data + ',20 ' + data + ',30 V150'
      return line
    }
  },
  watch: {
    data () {
      console.log('data changed! ', this.data)
      this.calucatePoints()
    }
  }
}
</script>

<style>

</style>
