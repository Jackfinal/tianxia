<template>
  <div class="user">
    <Top></Top>
		<div  style="height:60px;"></div>


    <form id="OrderForm" method="post" style="font-family:微软雅黑">
            <div id="TitleBar" class="titleBar">
                <span id="p_Title">
                    我的订单共<span id="total" v-if="list[0]" v-text="list[0]['countNumber']">0</span>条(第<span id="index" v-text="page">1</span>条)
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

		          <tbody v-for="(item, index) in list">
                <tr><td class="a_l" style="width: auto;">订单编号:</td><td class="a_r" style="width: auto;">{{item.id}}</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">下单时间:</td><td class="a_r" style="width: auto;">{{item.inputtime}}</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">订单金额:</td><td class="a_r" style="color: rgb(249, 135, 21); font-size: 18px; width: auto;">{{item.money}}&nbsp;元</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">公司名称:</td><td class="a_r" style="width: auto;">{{item.company}}</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">申请服务:</td><td class="a_r" style="width: auto;">{{item.title}}</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">数量:</td><td class="a_r" style="width: auto;">{{item.number}}</td></tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr><td class="a_l" style="width: auto;">处理状态:</td>
                  <td class="a_r" style="color: rgb(251, 142, 11); width: auto;" v-if="item.status == 0">待支付</td>
                  <td class="a_r" style="color: rgb(251, 142, 11); width: auto;" v-if="item.status == 1">支付成功，等待客服联系</td>
                  <td class="a_r" style="color: rgb(251, 142, 11); width: auto;" v-if="item.status == -1">已取消</td>
                  <td class="a_r" style="color: rgb(251, 142, 11); width: auto;" v-if="item.status == 2">已完成</td>
                </tr>
		            <tr><td class="line" colspan="2" style="width: auto;"></td></tr>
		            <tr>
                  <td class="a_l" style="width: auto;">操&nbsp;&nbsp;&nbsp;&nbsp;作:</td>
                  <td class="a_r" style="width: auto;"  v-if="item.status == 0" @click="CacelOrders">取消订单</td>
                </tr>
		         </tbody></table>



                        </div>
                        <table width="100%" style="width: 100%;">
                            <tbody><tr>
                                <td class="row cen" style="width: auto;">
                                    <div class="btnDIV">
                                    	<input type="button" id="Up" class=" twobtn new_btn" value="上一条" @click="NextInfo(2)" v-if="page > 1" style="margin-top:15px;">
                                        <input type="button" id="Next" class=" twobtn new_btn" value="下一条" @click="NextInfo(1)" style="margin-top:15px;">
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
import { GetOrders, CacelOrders } from '../api';
import { InfiniteScroll, Toast, MessageBox } from 'mint-ui';
export default {
  name: 'UserOrders',
  data() {
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      page: 1,
      list: {},
      loading: false,
      num: 1,
      flag: false,
      type: 0
    }

  },
  components: {
    Top,Footers
  },
  created() {
    this.type = (this.$route.params.id);
    this.GetOrders();
  },
  methods: {
    GetOrders() {
      GetOrders({ page: this.page, userid: this.user.uid, type:this.type, limit: this.num }).then(res=> {
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
        this.list = res;
      })
    },
    NextInfo(type) {
      if(type == 1)
      {
        this.page += 1
        this.GetOrders();console.log(this.page);
      }else {
        this.page -= 1
        this.GetOrders();console.log(this.page);
      }
    },
    CacelOrders() {
      CacelOrders({userid: this.user.uid, id: this.list[0]['id']}).then(res=> {
        if(res > 0)
        {
          this.list[0]['status'] = -1
          Toast('取消成功！');
        }else {
          Toast('取消失败！');
        }
      })
    }
  }
}

</script>

<style>
.new_btn
{
    width: 97% ;
    margin: 0 auto;
    text-align: center;
    height: auto;
    line-height: normal;
    cursor: pointer;
    font-size: 16px;
    color: #ffffff;
    padding: 10px 0px;
    background-color: #f56400;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
    border:none;
    -webkit-appearance: none;
}


</style>
