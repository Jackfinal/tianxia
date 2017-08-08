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
              <p style="line-height:25px; font-size:14px;">当前积分<br><span id="myMoney" v-text="user.experience">0</span>分</p>
            </td>
            <td align="center" style="width: auto;">
              <p style="line-height:25px; font-size:14px;">可兑换积分<br><span id="canWithdraw" v-text="user.score">0</span>分</p>
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
        <tbody id="rewardDetail"><!-- 奖励明细 -->


           <tr>
            <td class="indexthr_back" style="width: auto;">
              <span style="font-size:16px; color:#666; display:block; float:left; width:40%; line-height:36px;">2017-07-18 22:00</span>
              <span style="font-size:16px; color:#666; display:block; float:left;text-align:center; width:30%; line-height:36px;">获取</span>
              <span style="font-size:16px; color:; display:block; float:left; text-align:right;width:30%;line-height:36px;">1200分</span>

            </td>
          </tr>
           <tr>
            <td class="indexthr_back" style="width: auto;">
              <span style="font-size:16px; color:#666; display:block; float:left; width:40%; line-height:36px;">2017-07-18 22:00</span>
              <span style="font-size:16px; color:#666; display:block; float:left;text-align:center; width:30%; line-height:36px;">兑换</span>
              <span style="font-size:16px; color:; display:block; float:left; text-align:right;width:30%;line-height:36px;">1200分</span>

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
import { GetScore } from '../api';
export default {
  name: 'UserScore',
  data() {
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      page: 1
    }

  },
  components: {
    Top,Footers
  },
  created() {
    this.GetScore();
  },
  methods: {
    GetScore() {console.log(store.state);
      GetScore({ page: this.page, userid: this.user.uid, limit: 10 }).then(res=> {
        this.user = res;console.log(res)
        store.dispatch('saveUser', res)
      })
    },
    openAlbum() {

    },
    showsheetVisible() {
      console.log(111);
    },

    saveField(value, type) {

      saveField( {userid: this.user.id, value: value, field: type} ).then(res=> {
        if(res > 0)
        {
          this.user[type] = value
          if(type == 'birthday')
          {
            this.user.birthdaylock = 1;
          }
          store.dispatch('saveUser', this.user)
          Toast('修改成功！');
        }else {
          Toast('修改失败！');
        }
      })
    }

  },
  filters: {
    filterBirthday: function(value){
      if (!value || !value.indexOf(',')) return ''
      let l = value.split(',');
      return l[0]+ '年' + l[1] + '月' + l[2] + '日'
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
