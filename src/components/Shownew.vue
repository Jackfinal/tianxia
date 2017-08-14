<template>
  <div class="">
    <Top></Top>
    <banner></banner>
    <div class="m_new_t clearfix">
      <h3 class="float-l">{{content.catname}}</h3>
    </div>
    <div class="abtextbox" style="padding-top:10px;" v-html="info.content">
    </div>
    <div class="text" v-if="content.catid == 1">
           <!-- 2016-01-11  新增开始 -->
           <p><span class="srare_we" id="remarkChose">我们的产品（切换选项查看价格变化）</span></p>

             <div class="choice_o" v-if="content.extend.zprice > 0">
               <span style="font-size: 13px;margin: 15px 0 0 10px;">
                 挂靠地址:
               </span>
               <ul>

                   <li class="cho_r option1">
                   <a href="javascript:void(0);" @click="isActiveGKed(0)" :class="{ cho_hover: isActiveGK == 0 }">不需要</a>
                   </li>
                   <li class="cho_r option1">
                   <a href="javascript:void(0);" @click="isActiveGKed(1)" :class="{ cho_hover: isActiveGK == 1 }">需要</a>
                   </li>

               </ul>
           </div>



             <div class="choice_o">
               <span style="font-size: 14px;margin: 4px 0 0 10px;">
                 {{content.extend.sxmc}}
               </span>
               <ul>

                   <li v-if="content.extend.nrjjg" class="cho_r option2" v-for="(item, index) in content.extend.nrjjg">
                   <a href="javascript:void(0);" @click="selected(index)" :class="{ cho_hover: activeName == index }">{{item.name}}</a>
                   </li>


               </ul>
           </div>
       <!-- 2016-01-11  新增结束 -->
               <p style="display: inline-block;margin-top: 10px;">
                   价格： <span id="price" class="span1" style="font-size:16px;color:#F56400;">{{content.price}}元起</span>
               </p>
               <p>
                   <span class="span1" id="priceDesc"></span>
               </p>
               <p class="tc pb22" style="padding:10px;"><input type="button" @click="orderby();" style="width:100%;background:#f56400 !important;color:#fff;border: 1px solid #FFF !important;" class="reg-btn msf" value="立即购买"></p>

               <div align="justify" v-html="content.content">

               </div>


           </div>
    <div class="newsdetailtextbox" v-else>
    	<div class="newtextbg">
    		<h4>{{content.title}}</h4>
    		<h5>上传于：{{content.updatetime}}</h5>
    	</div>
    	<div align="justify" v-html="content.content">

      </div>

     </div>


    <Footers></Footers>
    <actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </actionsheet>
  </div>
</template>

<script>
import Top from './common/top'
import banner from './common/banner'
import Footers from './common/footer'
import store from '../store'
import { InfiniteScroll, Actionsheet } from 'mint-ui';
import { GetInfo } from '../api'
export default {
  name: 'Shownew',
  data () {
    let user = (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user;
    return {
      info: {},
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      user: user,
      content: {},
      isActiveGK: '',
      activeName: '',
      lastp: 0,
      actions: [ {name: '余额（剩余：' + user.money + '）', methods: '' }, {name:'在线支付', methods: ''} ],
      sheetVisible: false
    }
  },
  created() {
    let id = (this.$route.params.id);
    this.loadMore(id);


  },
  methods: {
    orderby() {
      if(!this.user.uid)
      {
        this.$router.push({ name: 'Login'})
      }
      this.sheetVisible = true;

    },
    loadMore(id) {
      if(!id)return false;
      this.loading = true;
      GetInfo({id}).then(res=> {
        this.content = res

      })
    },

    selected: function(index) {
      this.content.price = parseInt(this.content.price);
      this.activeName = index;
      let p = this.content.extend.nrjjg[index]['value']?parseInt(this.content.extend.nrjjg[index]['value']):0;

      if(this.lastp != 0) {
        this.content.price -= this.lastp;
      }
      this.content.price += p
      this.lastp = p;

    },
    isActiveGKed: function(type) {
      this.content.price = parseInt(this.content.price);

      if( type == 0 && this.isActiveGK != 0 )
      {
        this.content.price -= parseInt(this.content.extend.zprice)
      }
      if( type == 1 && this.isActiveGK != 1 ) {
        this.content.price += parseInt(this.content.extend.zprice)
      }
      this.isActiveGK = type

    }
  },
  components: {
    banner, Top, store, Footers, InfiniteScroll, Actionsheet
  }
}
</script>
