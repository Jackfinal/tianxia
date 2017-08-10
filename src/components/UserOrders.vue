<template>
  <div class="user">
    <Top></Top>
		<div  style="height:60px;"></div>


    <form id="OrderForm" method="post" style="font-family:微软雅黑">
            <div id="TitleBar" class="titleBar">
                <span id="p_Title">
                    我的订单共<span id="total">10</span>条(第<span id="index">1</span>条)
                </span>
            </div>
            <div id="WaitingBlock" selected="true">
            </div>
            <div id="WorkArea" selected="true">
                <div id="DataArea">
                    <div id="ctl00_TitleMsg" style="display: none; color: Red" class="title">
                    </div>
                    <div id="ctl00_DataContent">
                        <div id="UserInfo" class="box backfff"><!-- 加载信息 -->


							<table id="Table&quot;+idx+&quot;" name="Table" style="font-size: 14px; width: 100%;">

		          <tbody><tr><td class="a_l" style="width: auto;">订单编号:</td><td class="a_r" style="width: auto;">100001</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">下单时间:</td><td class="a_r" style="width: auto;">2017-7-18 22:00</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">订单金额:</td><td class="a_r" style="color: rgb(249, 135, 21); font-size: 18px; width: auto;">10000&nbsp;元</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">公司名称:</td><td class="a_r" style="width: auto;">苏州极鼎科技</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">申请服务:</td><td class="a_r" style="width: auto;">公司代账</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">服务期限:</td><td class="a_r" style="width: auto;">10年</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">处理状态:</td><td class="a_r" style="color: rgb(251, 142, 11); width: auto;">待回复</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">操&nbsp;&nbsp;&nbsp;&nbsp;作:</td><td class="a_r" style="width: auto;">取消订单</td></tr>
		         </tbody></table>



                        </div>
                        <table width="100%" style="width: 100%;">
                            <tbody><tr>
                                <td class="row cen" style="width: auto;">
                                    <div class="btnDIV">
                                    	<input type="button" id="Up" class=" twobtn new_btn" value="上一条" onclick="NextInfo(2)" style="margin-top:15px;">
                                        <input type="button" id="Next" class=" twobtn new_btn" value="下一条" onclick="NextInfo(1)" style="margin-top:15px;">
                                        <span id="MSG" style="color: red;"></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody></table>
                    </div>
                </div>
            </div>
        </form>
        <Footers></Footers>
  </div>
</template>
<style>
.user img { display:inline;}
</style>
<script>
import '../assets/css/style2.css'
import '../assets/css/common2015-11-06.css'
import Top from './common/top'
import Footers from './common/footer'
import store from '../store'
import { GetAccount, ApplyMoney } from '../api';
import { InfiniteScroll, Toast, MessageBox } from 'mint-ui';
export default {
  name: 'UserOrders',
  data() {
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      page: 1,
      list: {},
      loading: false,
      num: 10,
      flag: false,
      type: 0
    }

  },
  components: {
    Top,Footers
  },
  created() {
    this.type = (this.$route.params.id);
  },
  methods: {
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
