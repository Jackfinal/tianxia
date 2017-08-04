<template>
  <div class="">
    <Top></Top>
    <banner></banner>
    <div class="m_new_t clearfix">
      <h3 class="float-l">{{info.name}}</h3>
    </div>
    <div class="abtextbox" style="padding-top:10px;" v-html="info.content">
    </div>

    <div class="newsdetailtextbox">
    	<div class="newtextbg">
    		<h4>{{content.title}}</h4>
    		<h5>上传于：2017-07-15</h5>
    	</div>
    	<div align="justify" v-html="content.content">

    </div>

     </div>

    <Footers></Footers>

  </div>
</template>

<script>
import Top from './common/top'
import banner from './common/banner'
import Footers from './common/footer'
import store from '../store'
import { InfiniteScroll } from 'mint-ui';
import { GetInfo } from '../api'
export default {
  name: 'Shownew',
  data () {
    return {
      info: {},
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      content: {}
    }
  },
  created() {
    let id = (this.$route.params.id);

    this.loadMore(id);


  },
  methods: {
    loadMore(id) {
      if(!id)return false;
      this.loading = true;
      GetInfo({id}).then(res=> {
        this.content = res
        this.getInfo(this.content.catid);
      })
    },
    getInfo(catid) {
      for(let i in this.site.nav[3]['child'])
      {
        let temp = this.site.nav[3]['child'][i];
        if(temp.id == catid)
        {
          this.info = temp;
          break;
        }
      }
    },
  },
  components: {
    banner, Top, store, Footers, InfiniteScroll
  }
}
</script>
