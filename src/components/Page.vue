<template>
  <div class="">
    <Top></Top>
    <banner></banner>
    <div class="m_new_t clearfix">
      <h3 class="float-l">{{info.name}}</h3>
    </div>
    <div class="abtextbox" style="padding-top:10px;" v-html="info.content">

    </div>
    <Footers></Footers>

  </div>
</template>

<script>
import Top from './common/top'
import banner from './common/banner'
import Footers from './common/footer'
import store from '../store'
export default {
  name: 'Page',
  data () {
    return {
      info: {},
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
    }
  },
  created() {
    let id = (this.$route.params.id);
    for(let i in this.site.nav[4]['child'])
    {
      let temp = this.site.nav[4]['child'][i];
      if(temp.id == id)
      {
        this.info = temp;
        break;
      }
    }


  },
  components: {
    banner, Top, store, Footers
  }
}
</script>
