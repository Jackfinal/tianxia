<template>
  <div class="">
    <Top></Top>
    <banner></banner>
    <div class="m_new_t clearfix">
      <h3 class="float-l">{{info.name}}</h3>
    </div>
    <div class="abtextbox" style="padding-top:10px;" v-html="info.content">
    </div>

    <div class="newstextbox">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        :infinite-scroll-distance="num">

        <li v-for="(item, index) in list">
          <router-link :to="{ name: 'Shownew', params: { id:  item.id }}" ><img :src="item.thumb" style="width: 100%; height: auto;"></router-link>

    		<div class="newslistbox">
    			<dl>
    				<dt>
    					<router-link :to="{ name: 'Shownew', params: { id:  item.id }}" >
    							{{item.title}}
    					</router-link>
    				</dt>

    				<dd>
    					<h3 class="overflow-nowrap">发布时间：{{item.updatetime}}</h3>
    					<p class="newslistcot overflow-ellipsis line-clamp2">
    	{{item.description}}</p>
    				</dd>
    			</dl>
    		</div>
    		</li>
      </ul>
    </div>
    <Footers></Footers>


  </div>
</template>

<script>
import Vue from 'vue'
import Top from './common/top'
import banner from './common/banner'
import Footers from './common/footer'
import store from '../store'
import { InfiniteScroll, Toast } from 'mint-ui';
import { GetList } from '../api'
Vue.use(InfiniteScroll);

export default {
  name: 'Newlist',
  data () {
    return {
      info: {},
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      list: {},
      page: 1,
      loading: false,
      id: 0,
      num: 6,
      flag: false
    }
  },
  created() {
    let id = (this.$route.params.id);
    for(let i in this.site.nav[3]['child'])
    {
      let temp = this.site.nav[3]['child'][i];
      if(temp.id == id)
      {
        this.info = temp;
        break;
      }
    }
    this.id = id
  },
  methods: {
    loadMore() {
      if(!this.id)return false;
      this.loading = true;
      if(this.flag)return false;
      GetList({id: this.id, page: this.page, limit: this.num}).then(res=> {
        this.loading = false;
        if(res == '')
        {
          Toast({
            message: '没有了！',
            position: 'bottom',
            duration: 5000
          });
          this.flag = true
          return '';
        }
        if(this.page == 1)
        {
          this.list = res;
        }else {
          this.list = this.list.concat(res);
        }
        this.page += 1
      })

    }
  },
  components: {
    banner, Top, store, Footers, Toast
  }
}
</script>
