<template>
  <div class="">
    <Top></Top>
    <banner></banner>
    <div class="m_new_t clearfix">
      <h3 class="float-l" v-if="content.catid == 1">{{content.title}}</h3>
      <h3 class="float-l" v-else>{{content.catname}}</h3>
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
                   价格： <span id="price" class="span1" style="font-size:16px;color:#F56400;">{{content.price}}{{content.extend.dan}}</span>
               </p>
               <p>
                   <span class="span1" id="priceDesc"></span>
               </p>
               <p class="tc pb22" style="padding:10px;"><input type="button" @click="orderbyshop();" style="width:100%;background:#f56400 !important;color:#fff;border: 1px solid #FFF !important;" class="reg-btn msf" value="立即购买"></p>

               <div align="justify" v-html="content.content">

               </div>
               <div class="weixinimg"><img src="http://txcm.0512iis.com/images/weixin.jpg" width="50%" /><p>欢迎关注天下财猫</p></div>
               <div class="m_new_t clearfix"><h3 class="float-l">专家团队</h3></div>
               <vue-img-slider style="width: 100%; height:150px;margin-top:20px" :type="'left'"  margin="'20px'" :speed="50" :imgData="demoData" :txtPos="['0%','0%']"></vue-img-slider>


           </div>
    <div class="newsdetailtextbox" v-else>
    	<div class="newtextbg">
    		<h4>{{content.title}}</h4>
    		<h5>上传于：{{content.updatetime}}</h5>
    	</div>
      <div class="" v-if="content.catid == 3 || content.catid == 4">
      <p style="display: inline-block;margin-top: 10px;">
          价格： <span id="price" class="span1" style="font-size:16px;color:#F56400;">{{content.price}}元</span>
      </p>
      <p class="tc pb22" style="padding:10px;"><input type="button" @click="orderbyshop();" style="width:100%;background:#f56400 !important;color:#fff;border: 1px solid #FFF !important;" class="reg-btn msf" value="立即购买"></p>
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
import VueImgSlider from './common/VueImgSlider'
import store from '../store'
import { InfiniteScroll, Actionsheet, MessageBox } from 'mint-ui';
import { GetInfo, orderPay, weiXinPaySuccess  } from '../api'
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
      actions: [],
      sheetVisible: false,
      ordertype: 1,
      money: 0,
      demoData: [
           {
             img: 'http://f12.baidu.com/it/u=1981748892,3031683197&fm=72',
             title: '图片1'
           },
           {
             img: 'http://f10.baidu.com/it/u=3243370105,1125765815&fm=72',
             title: '图片2'
           }]
    }
  },
  created() {
    let id = (this.$route.params.id);
    this.loadMore(id);

  },
  methods: {
    orderbyshop() {
      if(!this.user.uid)
      {
        this.$router.push({ name: 'Login'})
      }
      if(this.content.catid == 1)
      {
        //this.$router.push({ name: 'Newform', params:{ id: this.content.id } })
      }
      let title = '';
      let titled = '';
      if(this.user.experience >0){
        titled = '，积分：'+this.user.experience;
      }

      if( parseFloat(this.content.price) > parseFloat(this.user.money))
      {
        let money = parseFloat(this.content.price) - parseFloat(this.user.money)
        title = '在线支付：' + money + '元（余额 '+this.user.money+'元)'
        this.money = money
      }else {
        title = '余额支付：' + this.content.price + '元'
        this.orderby = 2
        this.money = this.content.price
      }console.log(title);
      this.actions = [ {name: title, method: this.lastM} ]
      this.sheetVisible = true;

    },
    loadMore(id) {
      if(!id)return false;
      this.loading = true;
      GetInfo({id}).then(res=> {
        this.content = res
        this.demoData = res.zjd
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

    },
    lastM: function() {
      orderPay({userid: this.user.uid, money: this.money, type: this.ordertype, openid: this.user.openid, id:this.content.id}).then(res=> {
        if(typeof res == 'number')
        {
          MessageBox.alert('支付成功').then(action => {
            this.$router.push( { name: 'UserOrders'} )
          });
        }else {
          if (typeof WeixinJSBridge == "undefined"){
             if( document.addEventListener ){
                 document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
             }else if (document.attachEvent){
                 document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                 document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
             }
          }else{
             this.onBridgeReady(res);
          }
        }
      })
    },
    onBridgeReady:function(result) {
      let id = result.id;
      delete result.id;
      let _this = this;
      WeixinJSBridge.invoke(
       'getBrandWCPayRequest',  result,
         function(res){
             if(res.err_msg == "get_brand_wcpay_request:ok" ) {
               weiXinPaySuccess( { id: id, openid: _this.user.openid, userid: _this.user.uid } ).then(res=> {
                 store.dispatch('saveUser', res)
                 MessageBox.alert('支付成功').then(action => {
                   _this.$router.push( { name: 'UserOrders'} )
                 });

               })

             }else {
               MessageBox.alert('支付失败')
             }
         }
     );
   }
  },
  components: {
    banner, Top, store, Footers, InfiniteScroll, Actionsheet, VueImgSlider
  }
}
</script>
<style>
.weixinimg{ text-align: center; margin: 20px 0;}
</style>
