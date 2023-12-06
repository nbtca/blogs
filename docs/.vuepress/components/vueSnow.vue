<template>
  <div>
    <let-it-snow
      v-bind="snowConf"
      :show="show"    
    ></let-it-snow>
  </div>
</template>

<script>
import Vue from 'vue'
import LetItSnow from 'vue-let-it-snow';

Vue.use(LetItSnow);
export default {
//   name: 'app',
  data () {
  	return {
        snowConf: {
            windPower : 1,  
            speed : 1,
            count : 12,
            size : 7,
            opacity : 1,
            images: ['https://nbtca-1310707740.cos.ap-shanghai.myqcloud.com/logo_1.png',]
        },
        show: false      
    }
  },
  mounted () {
      this.show = true
    //   setTimeout( () => {
    //       this.show = false
    //   }, 5000)

    //   setTimeout( () => {
    //       this.show = true
    //   }, 10000)      
  }  
}
</script>
