<template>
  <div class="user">
    <Top></Top>
		<div  style="height:60px;"></div>


    <div class="common_box" style="padding-bottom: 20px; width:98%; margin:0 auto;margin-top:38px;">
      <table class="wdzh_box" cellspacing="0" cellpadding="0" width="98%" style="width: 100%;">
        <tbody>
          <tr>
            <td colspan="2" align="center" style="width: auto;">

        <img style="margin-top:18px;" class="wdzh_tx" :src="user.avatar" width="70" height="70">


            </td>
          </tr>
          <tr>
            <td colspan="2" align="center" style="width: auto;">
              <p class="wdzh_nc" style="font-size:20px;">我的余额</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="width: auto;">
              <p style="line-height:25px; font-size:14px;">我的余额<br><span id="myMoney" v-text="'¥'+user.money">¥ 0</span>元</p>
            </td>
            <td align="center" style="width: auto;">
              <p style="line-height:25px; font-size:14px;">可提现的余额<br><span id="canWithdraw" v-text="'¥'+user.money">¥ 0</span>元</p>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="indexthr_zxyhbox" cellspacing="0" cellpadding="0" style="width: 100%; background: rgb(96, 99, 105); margin: 5px auto 0px; border: 1px solid rgb(250, 249, 245);">
        <tbody>
          <tr>
            <td class="indexthr_back" style="background-color: rgb(96, 99, 105); width: auto;">
              <span style="font-size:16px; color:white;" v-if="type == 0">账户明细</span>
              <span style="font-size:16px; color:white;" v-else>消费记录</span>
            </td>
          </tr>
        </tbody>
      </table>


      <table class="wdzh_bottombtn" style="border: 0px; width: 100%;" cellspacing="0" cellpadding="0" v-if="type == 0">
            <tbody>
               <tr>
                 <td style="width: auto;">
                   <div class="wdzh_btnn">
                     <button class="yysjs_btn" type="button" @click="ApplyMoney()" style="font-family: Microsoft YaHei; ">申请提现（限一天一次）</button>
                   </div>
                 </td>
                 <td width="30%" style="width: auto;">
                   <div class="wdzh_btnn">
                     <button style="background:#F7CB16;color:white; " id="Recharge" class="yysjs_btn" type="button" @click="Recharge()">充值</button>
                   </div>
                 </td>
               </tr>
            </tbody>
          </table>
      <table class="wdzh_boxtwo" cellspacing="0" cellpadding="0" style="width: 100%; margin: 5px auto 0px; border: 1px solid rgb(221, 221, 221);">
        <tbody id="rewardDetail" v-infinite-scroll="GetAccount"
        infinite-scroll-disabled="loading"
        :infinite-scroll-distance="num"><!-- 奖励明细 -->


           <tr v-for="(item, index) in list">
            <td class="indexthr_back" style="width: auto;">
              <span style="font-size:16px; color:#666; display:block; float:left; width:40%; line-height:36px;" v-text="item.inputtime"></span>
              <span style="font-size:16px; color:#666; display:block; float:left;text-align:center; width:30%; line-height:36px;" v-text="item.note"></span>
              <span style="font-size:16px; color:; display:block; float:left; text-align:right;width:30%;line-height:36px;" v-text="item.value"></span>

            </td>
          </tr>


        </tbody>
      </table>



    </div>
        <Footers></Footers>
  </div>
</template>
<style>
.user img { display:inline;}
</style>
<script>
import '../assets/css/style2.css'
import Top from './common/top'
import Footers from './common/footer'
import store from '../store'
import { GetAccount, ApplyMoney, Recharge, weiXinPaySuccess } from '../api';
import { InfiniteScroll, Toast, MessageBox } from 'mint-ui';
export default {
  name: 'UserAccount',
  data() {
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      page: 1,
      list: {},
      loading: false,
      num: 10,
      flag: false,
      type: 0,
      m: 0
    }

  },
  components: {
    Top,Footers
  },
  created() {
    if(this.$route.params.id)
    {
      this.type = (this.$route.params.id);
    }


  },
  methods: {
    Recharge() {
      MessageBox.prompt('请输入充值的金额(单位：元)').then(({ value, action }) => {
        let m = this.toDecimal2(value);
        this.m = m
        if(action == 'confirm')
        {

          Recharge({ userid: this.user.uid, value: m, openid: this.user.openid }).then(res=> {
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

          })
        }
      });
    },
    onBridgeReady:function(result) {
      let id = result.id;
      delete result.id;
      let _this = this;
      WeixinJSBridge.invoke(
       'getBrandWCPayRequest',  result,
         function(res){
             if(res.err_msg == "get_brand_wcpay_request:ok" ) {
               _this.xx = parseFloat(_this.user.money) + parseFloat(_this.m);
               _this.user.money = _this.xx;
               weiXinPaySuccess( { id: id, openid: _this.user.openid, userid: _this.user.uid } ).then(res=> function(){_this.xx = JSON.stringify(res);
                 store.dispatch('saveUser', res)
                  _this.user.money = res.money;

               })

             }else {
               Toast('支付失败，请稍后再试！');
             }
         }
     );
   },
    ApplyMoney() {
      MessageBox.prompt('请输入提现的金额(单位：元)').then(({ value, action }) => {
        let m = this.toDecimal2(value);
        if(m > this.user.money)
        {
          Toast('余额不足！');
          return false;
        }
        if(action == 'confirm')
        {
          //发送提现申请
          ApplyMoney({ userid: this.user.uid, value: m }).then(res=> {
            if(res > 0)
            {
              Toast('申请成功！请等待客服打款');
            }else {
              Toast('申请失败！请联系客服');
            }

          })
        }
      });
    },
    GetAccount() {
      this.loading = true;
      if(this.flag)return false;
      GetAccount({ page: this.page, userid: this.user.uid, type:this.type, limit: this.num }).then(res=> {
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
    },
    toDecimal2(x) {
       var f = parseFloat(x);
       if (isNaN(f)) {
        return '0.00';
       }
       var f = Math.round(x*100)/100;
       var s = f.toString();
       var rs = s.indexOf('.');
       if (rs < 0) {
        rs = s.length;
        s += '.';
       }
       while (s.length <= rs + 2) {
        s += '0';
       }
       return s;
      }
  }



}

</script>

<style>
.title-h3{ text-align: center; font-size: 0.3rem; font-weight: normal;background: #fff; line-height: 0.8rem;box-shadow: 0 2px 8px #ccc; margin-bottom: 0.04rem}
.divli{ border-top: 0px solid #f4f4f4;margin-top: 1px;}

.avatar-div {
    width: 1.2rem;
    height: 1.2rem;
    float: right;
}
.uploader-input {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.avatar {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
}
.mint-cell-wrapper{ border:0px!important; background: none;}

</style>
