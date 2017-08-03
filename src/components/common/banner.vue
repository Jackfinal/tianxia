<template>
  <div class="bql_n_banner po-r" style="margin-top:44px;float: left;">
    <img width="100%" :src="site.site.er3">
    <div class="po-a">
      <h3 class="display-i">{{site.site.er1}}</h3>
       <div class="p" v-html="site.site.er2"></div>
    </div>
  </div>
</template>
<script>
import store from '../../store'
export default {
  name: 'banner',

  data() {
    return {
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
    }
  }
}
</script>
