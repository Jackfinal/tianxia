<template>
  <div class="">
<top></top>
  </div>
</template>
<script>
import store from '../store'
import Top from './common/top'
import {GetIndex} from '../api'
export default {
  name: 'Index',
  data (){
    return {
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
    }
  },
  components: {
    Top,GetIndex
  },
  created() {
    GetIndex().then(res=> {
      this.site = res;console.log(this.site);
      store.dispatch('saveSite', this.site)
    })
  }
}
</script>
