<template>
  <div class="">
    <top></top>
    <div class="swiper-container">
    <swipe :auto="4000">
      <swipe-item v-for="(item,index) in site.banner"><div class="swiper-slide">
              <a :href="item.url">
          <img width="100%" :src="item.thumb"  class="swiper-no-swiping">
              </a>
      </div></swipe-item>
    </swipe>
    </div>
    <div class="tuijianbg">
    	<ul class="tuijian">
    		<li>
    			<img src="../assets/images/pic1.jpg" class="img-responsive"></li>
    		<li>
          <router-link :to="{ name: 'Shoplist', params: { id:  1 }}">
    			<img src="../assets/images/pic2.jpg" class="img-responsive"></router-link>
        </li>
    		<li><router-link :to="{ name: 'Shoplist', params: { id:  3 }}">
    			<img src="../assets/images/pic3.jpg" class="img-responsive"></router-link></li>
    		<div class="clear">
    		</div>
    		<li><router-link :to="{ name: 'Shoplist', params: { id:  4 }}">
    			<img src="../assets/images/pic4.jpg" class="img-responsive"></router-link></li>
    		<li><router-link :to="{ name: 'Shoplist', params: { id:  12 }}">
    			<img src="../assets/images/pic5.jpg" class="img-responsive"></router-link></li>
    		<li><router-link :to="{ name: 'Shoplist'}">
    			<img src="../assets/images/pic6.jpg" class="img-responsive"></router-link></li>
    		<div class="clear">
    		</div>
    	</ul>
    </div>

    <!-- main -->
    <div class="clear"></div>
    <div class="bql_main">
    	<div class="m_new_t clearfix">
    		<h3 class="float-l">我们的服务</h3>
    	</div>
      <navbar v-model="selected">
        <tab-item id="1"><span>注册代账</span></tab-item>
        <tab-item id="2"><span>天猫转让</span></tab-item>
        <tab-item id="3"><span>商标注册</span></tab-item>
        <tab-item id="4"><span>法律咨询</span></tab-item>
      </navbar>

      <!-- tab-container -->
      <tab-container v-model="selected">
        <tab-container-item id="1">
          <div class="clearfix swiper_product swiper_dl">
  					<dl class="float-l" v-for="(item,index) in site.zhuce">
  						<div :style="'height:150px;  width:100%; padding:15px;'" :class="'sssssbg'+index">
  							<div class="bt1">{{item.title}}</div>
  							<div class="bt2">{{item.description}}</div>
  							<div class="bt3">价格：<span>{{item.price}}RMB</span></div>
                <router-link :to="{ name: 'Shownew', params: { id:  item.id }}" style="	float:right;">
  							<div class="bt4">查看详情</div></router-link>
  						</div>
  					</dl>
          </div>
        </tab-container-item>
        <tab-container-item id="2">
          <div class="clearfix swiper_product">

				        <div class="dsj">
                  <a href="javascript:void(0);"><img width="100%" class="display-i" :src="site.nav[1]['thumb']" alt=""></a>
                  <h3>{{site.nav[1]['lanmu']}}</h3>
                  <p>{{site.nav[1]['lanmums']}}</p>
                </div>
             </div>
        </tab-container-item>
        <tab-container-item id="3">
          <div class="clearfix swiper_product">
				        <div class="dsj">
                  <a href="javascript:void(0);"><img width="100%" class="display-i" :src="site.nav[2]['thumb']" alt=""></a>
                  <h3>{{site.nav[2]['lanmu']}}</h3>
                  <p>{{site.nav[2]['lanmums']}}</p>
                </div>
             </div>
        </tab-container-item>
        <tab-container-item id="4">
          <div class="clearfix swiper_product">
				        <div class="dsj">
                  <a href="javascript:void(0);"><img width="100%" class="display-i" :src="site.nav[5]['thumb']" alt=""></a>
                  <h3>{{site.nav[5]['lanmu']}}</h3>
                  <p>{{site.nav[5]['lanmums']}}</p>
                </div>
             </div>
        </tab-container-item>
      </tab-container>

      <div class="m_new_t clearfix">
		<h3 class="float-l">新闻中心</h3>
	</div>
		<ul class="m_new_content">
				<li class="clearfix" v-for="(item, index) in list">
			<router-link :to="{ name: 'Shownew', params: { id:  item.id }}">
				<div class="float-l">
					<img width="100%" :src="item.thumb" alt="">
				</div>
				<div class="float-r">
					<h3 class="overflow-nowrap">
					{{item.title}}
					</h3>
					<h4>发布时间：{{item.updatetime}}</h4>
					<p class="overflow-ellipsis line-clamp3">
		{{item.description}}
					</p>
				</div>
			</router-link>
		</li>
	</ul>

    </div>
<Footers></Footers>

  </div>
</template>
<script>
import store from '../store'
import Top from './common/top'
import Footers from './common/footer'
import { GetIndex, GetList } from '../api'
import { Swipe, SwipeItem, TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui'
export default {
  name: 'Index',
  data (){
    return {
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      selected: '1',
      list: {}
    }
  },
  components: {
    Top, Footers, GetIndex, Swipe, SwipeItem, TabContainer, TabContainerItem, Navbar, TabItem
  },
  created() {console.log(store.state.user);
    GetIndex().then(res=> {
      this.site = res;
      store.dispatch('saveSite', this.site)
    })
    GetList({id:5,limit:3}).then(res=> {
      this.list = res
    })

  },
  methods: {
    changBg: function(index)
    {
      let a = ['a', 'b', 'c', 'd'];
      a.forEach(function (v, i){
        if(i == index)
        {
          return v;
        }
      })
      return 'a';
    }
  }
}
</script>

<style>
.swiper-container,.mint-swipe,.mint-swipe-item,.mint-swipe-item img{
  height: 250px!important;
}
.swiper-container{
  margin-top: 44px;
    overflow: hidden;
    width: 100%;
    float: left;
}
.mint-navbar{margin: 0 0%;}
.mint-tab-item-label span{color: #6d6d6d;
    font-size: 15px;
    }
    .mint-navbar .mint-tab-item.is-selected{
      border-bottom: 3px solid #F98715;

    }
        .mint-navbar .mint-tab-item.is-selected span{color: #F98715!important;}
        .mint-tab-container{margin-top: 20px;}
</style>
