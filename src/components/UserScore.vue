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
              <p class="wdzh_nc" style="font-size:20px;">我的积分</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="width: auto;">
              <p style="line-height:25px; font-size:14px;">积分<br><span id="myMoney" v-text="user.experience">0</span>分</p>
            </td>
            <td align="center" style="width: auto;">
              <p style="line-height:25px; font-size:14px;" @click="duihuan">兑换积分</p>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="indexthr_zxyhbox" cellspacing="0" cellpadding="0" style="width: 100%; background: rgb(96, 99, 105); margin: 5px auto 0px; border: 1px solid rgb(250, 249, 245);">
        <tbody>
          <tr>
            <td class="indexthr_back" style="background-color: rgb(96, 99, 105); width: auto;">
              <span style="font-size:16px; color:white;">积分明细</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="wdzh_boxtwo" cellspacing="0" cellpadding="0" style="width: 100%; margin: 5px auto 0px; border: 1px solid rgb(221, 221, 221);">
        <tbody id="rewardDetail" v-infinite-scroll="GetScore"
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
      <div class="contentlist" v-html="content">

      </div>

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
import { GetScore,exchange } from '../api';
import { InfiniteScroll, Toast,MessageBox } from 'mint-ui';
export default {
  name: 'UserScore',
  data() {
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      page: 1,
      list: {},
      loading: false,
      num: 10,
      flag: false,
      content: ''
    }

  },
  components: {
    Top,Footers
  },
  created() {
  },
  methods: {
    GetScore() {console.log(this.page);
      this.loading = true;
      if(this.flag)return false;
      GetScore({ page: this.page, userid: this.user.uid, limit: this.num }).then(res=> {
        this.loading = false;
        this.content = res.content;
        if(res.list == '')
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
          this.list = res.list;
        }else {
          this.list = this.list.concat(res.list);
        }
        this.page += 1
      })
    },
    duihuan(){
      MessageBox.prompt('请输入兑换的积分').then(({ value, action }) => {
        let m = parseInt(value);
        this.m = m
        if(action == 'confirm')
        {
          if(parseInt(this.user.experience) < m){
            Toast('积分不足');
            return false;
          }
          exchange({userid: this.user.uid,m:m}).then(res=> {
            if(res > 0)
            {
              this.user.experience = parseInt(this.user.experience) - m;
              this.user.score =this.user.experience;
              store.dispatch('saveUser', this.user)
              Toast('兑换成功！');

            }else{
              Toast('兑换失败！');
            }
          })


        }
      });
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
