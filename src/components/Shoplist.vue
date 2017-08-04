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
    <div class="download_list">

	<div class="download_list_box" v-if="id==3">
    <ul class="con_ul clearfix" id="serviceList"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-distance="num">
						<a href="tmzr.htm">
			<li class="clearfix">
				<img class="divleft" src="images/tmzr.png" alt="">
				<div class="dow_list_d">
					<h3><strong>天猫店铺名称</strong></h3>
					<span class="display-b">
						<i>店铺价格：1000RMB</i><br>
						<i>行业分类：化妆日用</i>
					</span>
					<p class="overflow-ellipsis">某某天猫店铺简介某某天猫店铺简介某某天猫店铺简介某某天猫店铺简介某某天猫店铺简介某某天猫店铺简介某某天猫店铺简介</p>
				</div>
			</li>
			</a>

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
  }
}
</script>
