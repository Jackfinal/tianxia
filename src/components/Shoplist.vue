<template>
  <div class="">
    <Top></Top>
    <banner></banner>
    <div class="m_new_t clearfix">
      <h3 class="float-l">{{info.name}}</h3>
    </div>
    <div class="abtextbox" style="padding-top:10px;" v-html="info.content">
    </div>

    <div class="tab_con" style="display:block;margin-top: 20px;margin-bottom:22px;"  v-if="id==1">
      <ul class="con_ul clearfix" id="serviceList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        :infinite-scroll-distance="num">
        <li v-for="(item, index) in list">
          <dl>
            <span class="fl">
              <i style="" class="iconfont icon-ruanzhuang web-allicons"><img :src="item.thumb" ></i>
            </span>
            <dd>
              <div class="sname"><span>{{item.title}}</span></div>
              <p><b style="color:#F56400; font-weight: normal;">￥{{item.price}}元起</b></p>
            </dd>
          </dl>
          <router-link :to="{ name: 'Shownew', params: { id:  item.id }}" class="list_dow abso">了解详情</router-link>
        </li>
      </ul>
    </div>
    <div class="download_list" v-else-if="id==3">

	<div class="download_list_box">
    <ul class="con_ul clearfix" id="serviceList"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-distance="num">
						<router-link v-for="(item, index) in list" :to="{ name: 'Shownew', params: { id:  item.id }}" >
			<li class="clearfix">
				<img class="divleft" :src="item.thumb" alt="">
				<div class="dow_list_d">
					<h3><strong>{{item.title}}</strong></h3>
					<span class="display-b">
						<i>店铺价格：{{item.price}}RMB</i><br>
						<i>行业分类：{{item.xingye}}</i>
					</span>
					<p class="overflow-ellipsis">{{item.description}}</p>
				</div>
			</li>
			</router-link>

    </ul>
  </div>
</div>

<div class="tab_con" style="display:block;margin-top: 20px;margin-bottom:22px;" v-else-if="id==4">
              <ul v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              :infinite-scroll-distance="num" class="con_ul clearfix" id="serviceList">


			  <li v-for="(item, index) in list">
          <dl>
            <dd style="margin-left:10px; line-height:70px;">
              <div style="font-size: 14px;font-weight: bold;line-height: 50px;">
                <span>{{item.title}}</span>
              </div>
            </dd>
          </dl>  <router-link :to="{ name: 'Shownew', params: { id:  item.id }}" class="list_dow abso">了解详情</router-link></li>



			  </ul>
            </div>


    <Footers></Footers>


  </div>
</template>

<script>
import '../assets/css/zhuce.css'

import Vue from 'vue'
import Top from './common/top'
import banner from './common/banner'
import Footers from './common/footer'
import store from '../store'
import { InfiniteScroll, Toast } from 'mint-ui';
import { GetList } from '../api'
Vue.use(InfiniteScroll);

export default {
  name: 'Shoplist',
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
  watch: {
    '$route' (to, from) {
     //if(this.id != (this.$route.params.id))
     //{
       this.id = this.$route.params.id
       this.list = {}
       this.page = 1
       this.flag = false
       this.loadMore();
     //}

   }
  },
  created() {
    let id = (this.$route.params.id);
    for(let i in this.site.nav)
    {
      let temp = this.site.nav[i];
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
        }console.log(this.list);
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
  },
  init  : function (){console.log(this.id);
                alert("销毁前....");
            },
}
</script>
