<template>
  <div class="">

    <form id="OrderForm" method="post" class="box">
          <div id="TitleBar" class="titleBar">
            <table style="background: white;height: 50px;position: fixed;top: 0;width: 100%;z-index: 100;color: #444444;border-bottom: 1px solid #F98715;">
              <tbody><tr>
              <td>
                  <span id="p_Title" v-text="content.title"></span>
              </td></tr>
            </tbody></table>
            </div>
            <div id="WaitingBlock" selected="true">
            </div>
            <div id="WorkArea" selected="true">
                <div id="DataArea">
                    <div id="ctl00_TitleMsg" style="display: none; color: Red" class="title">
                    </div>
                    <div id="ctl00_DataContent" style="margin-top: -40px;">
                        <div id="UserInfo" class="box backfff">
                            <div class="row">
                                <table id="Table1">
                                    <tbody><tr>
                                        <td colspan="2" class="a_l title">
                                            请详细核对您的信息。(*为必填)
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="line" colspan="2">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="a_l" width="100px;">
                                            *手机号码:
                                        </td>
                                        <td class="a_r">
                                            <input value="" class="input100px" type="text" maxlength="11" id="mobile" v-model="mobile"  name="cust_mobilephone" :value="user.phone">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="line" colspan="2">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="a_l">
                                            *所在地区:
                                        </td>
                                        <td class="a_r">
                                        	<input value="" class="input100px" type="text" maxlength="11" id="cust_mobilephone" v-model="address"  name="address" :value="user.companyaddress">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="line" colspan="2">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="a_l">
                                            *您的尊称:
                                        </td>
                                        <td class="a_r">
                                            <input class="input100px" type="text" id="name" name="name" v-model="name" :value="user.name">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="line" colspan="2">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="a_l">
                                            *公司名称:
                                        </td>
                                        <td class="a_r">
                                            <input class="input100px" type="text" id="cust_company" v-model="companyname" name="companyname" :value="user.companyname">
                                        </td>
                                    </tr>

                                    <!-- 企业社保代理  -->

                                    <!-- END -->
                                    <!-- 纳税减免备案 -->

                                    <!-- END -->
                                    <!-- 纳税减免备案 -->

                                    <!-- END -->
                                    <tr id="fwq">
                                        <td class="a_l">
                                            *服务期:
                                        </td>
                                        <td class="a_r">
                                        	<select id="servicetime"  class="sr_select" v-model="servicetime" name="servicetime">
                                        		<option value="3个月">3个月</option>
                                        		<option value="6个月">6个月</option>
                                        		<option value="12个月">12个月</option>
                                        	</select>
                                        </td>
	                                    </tr>
	                                    <tr>
	                                        <td class="line" colspan="2">
	                                        </td>
	                                 </tr>
	                                <!-- 代理记账开始 -->

	                                    <tr>
	                                        <td class="a_l">
	                                            *增值服务:
	                                        </td>
	                                        <td class="a_r" id="addService"><select class="sr_select" id="zzfw" v-model="addservice" name="addservice"><option value="不需要">不需要</option> <option value="代账增值服务（不单独订购）">代账增值服务（不单独订购）</option> </select></td>
	                                    </tr>
	                                    <tr>
	                                        <td class="line" colspan="2">
	                                        </td>
	                                    </tr>
	                                    <tr>
	                                        <td class="a_l">
	                                            *所得税汇算清缴:
	                                        </td>
	                                        <td class="a_r" style="width:180px;" id="IncomeTax"><select name="havenum" v-model="havenum" class="sr_select" id="HuisuanIncome" ><option value="不需要">不需要</option> <option value="所得税汇缴或单次财税服务(代账)">所得税汇缴或单次财税服务(代账)</option> </select></td>
	                                    </tr>


                                </tbody></table>
                            </div>
                        </div>

                        <table width="100%">
                            <tbody><tr>
                                <td class="row cen" style="width: 50%" id="Next">
                                    <div class="btnDIV">
                                        <input type="button" id="Nextbutton" class="btn twobtn" value="提交订单" @click="subOrderInfo()">
                                        <span id="MSG" style="color: red;"></span>
                                    </div>
                                </td>
                            </tr>
                        </tbody></table>
                    </div>
                </div>
            </div>
        </form>

  </div>
</template>

<script>
import store from '../store'
import { InfiniteScroll, Actionsheet } from 'mint-ui';
import { GetInfo, addNewsForm } from '../api'
export default {
  name: 'Newform',
  data () {
    let user = (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user;
    console.log(store.state.user);
    return {
      info: {},
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      user: user,
      content: {},
      isActiveGK: '',
      activeName: '',
      lastp: 0,
      actions: [ {name: '余额（剩余：' + user.money + '）', methods: '' }, {name:'在线支付', methods: ''} ],
      sheetVisible: false,
      havenum:'不需要',
      mobile: user.phone,
      address: user.companyaddress,
      companyname: user.company,
      servicetime: '3个月',
      addservice: '不需要',
      name: user.name,
    }
  },
  created() {
    let id = (this.$route.params.id);
    this.loadMore(id);

  },
  methods: {
    subOrderInfo() {
      let data = {
        mobile: this.mobile,userid:this.user.uid, havenum: this.havenum, address: this.address, companyname: this.companyname, servicetime: this.servicetime, addservice: this.addservice, name: this.name, id: this.content.id, author: this.user.name, subject: this.content.title
      }
      addNewsForm( data ).then(res=> {
        Toast('提交成功，请等待客户联系');
      })

    },
    loadMore(id) {
      if(!id)return false;
      this.loading = true;
      GetInfo({id}).then(res=> {
        this.content = res

      })
    },


  },
  components: {
  InfiniteScroll, Actionsheet
  }
}
</script>
<style>
.box .row table td
{
    font-size: 14px;
    vertical-align: middle;
    word-wrap: break-word;
    word-break: break-all;
}
.titleBar span
{
    color: #656565;
    font-size: 20px;
}
.titleBar
{
    width: 100%;
    background: white;
    line-height: 44px;
    height: 44px;
    text-align: center;
    margin-top: 50px;
}
@media only screen and (max-width:320px)
{
    div.line
    {
        background: transparent;
        border-top: 1px solid #CACACA;
        box-shadow: 0 1px 1px #fff;
        -webkit-box-shadow: 0 1px 1px #fff;
        -moz-box-shadow: 0 1px 1px #fff;
        -o-box-shadow: 0 1px 1px #fff;
        -ms-box-shadow: 0 1px 1px #fff;
    }
}

@media only screen and (-webkit-min-device-pixel-ratio: 2)
{
    /*iphone4 only*/
    .titleBar
    {
        background-size: auto 44px;
        -webkit-background-size: auto 44px;
        -moz-background-size: auto 44px;
    }
}
select
{   width:99% !important; border:1px solid #e4e5e7;
    height: 30px;
    line-height: 29px;
    font-size: 16px;
    color: #808184; /* 	line-height: normal;     -webkit-appearance:none; 	-moz-appearance:none; 	-o-appearance:none; 	-ms-appearance:none;*/
}
input
{
    font-size: 16px;
}
input[type="text"], input[type="password"]
{
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
    color: Black;
    background-color: #fff;
    padding: 0 5px;
    border: none;
    border-radius: 2px; width:95%;

}
.btn
{
    width: 97% !important;
    margin: 0 auto;
    text-align: center;
    height: auto;
    line-height: normal;
    cursor: pointer;
    font-size: 16px;
    color: #ffffff;
    padding: 10px 0px;
    background-color: #f56400;
    border-radius: 6px;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    -o-border-radius: 6px;
    -ms-border-radius: 6px;
    border:none;
    -webkit-appearance: none;
}
</style>
