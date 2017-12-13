<template>
  <div class="sign">
    <div class="sign-banner"><img src="http://txcm.0512iis.com/images/sign-banner.png" /></div>
    <div class="sign-nei">
      <div class="sign-txt" v-if=" user.isSign ">今日已签到</div>
      <div class="sign-txt" @click="sign" v-else>签到</div>
      <div class="sign-pace"><img :src="user.avatar" />{{user.name}}</div>
      <div class="sign-score">我的积分：{{user.score}}</div>
    </div>

    <calendar></calendar>
    <div class="button">
      <a href="javascript:;" @click="show1 = true">签到明细</a>
      <a href="javascript:;" @click="show = true">签到规则</a>
    </div>

    <div class="qiandao" v-show="show" @click="show = false">
      <div class="cent">
      <div class="titlet">签到规则</div>
      <div class="contt" v-html="user.content.content">

      </div>
    </div>
    </div>

    <div class="qiandao" v-show="show1" @click="show1 = false">
      <div class="cent">
      <div class="titlet">签到明细</div>
      <div class="contt">
        本月已经签到{{user.mingxiday}}天，赚取{{user.mingxiscore}}积分，再接再厉！
      </div>
    </div>
    </div>

  </div>

</template>
<style>
.user img { display:inline;}
</style>
<script>
import '../assets/css/style2.css'
import calendar from './common/calendar'
import store from '../store'
import { GetUser, sign, signlist } from '../api';
import { Toast } from 'mint-ui';

export default {
  name: 'Sign',
  data() {
    var d = new Date(2017)
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      date: '',
      show: false,
      show1: false,
      content: '',
    }

  },
  components: {
    calendar
  },
  created() {
    this.GetInfo();console.log(this.user);
  },
  methods: {
    GetInfo() {
      GetUser({userid:this.user.uid}).then(res=> {
        this.user = res;
        store.dispatch('saveUser', res)
      })
    },
    sign() {
      sign( {userid: this.user.uid} ).then(res=>{
        if(res > 0){
          Toast('签到成功！');
          this.user.isSign = true;
          this.user.experience += 1;
          this.user.score += 1;
          store.dispatch('saveUser', this.user);
          setTimeout("location.reload()",3000);
        }else {
          Toast('签到失败！');
        }

      })
    },
    popupVisible() {
      console.log(1);
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
.sign{ background: #f6f6f6}
.sign-txt{ text-align: center; font-size: 2rem;color: #c12434;}
.sign-pace img{border-radius: 50%; margin-right: 10px; border: 1px solid #30b3b7; width: 20%}
.sign-pace{ text-align: center; line-height: 6rem;font-size: 1.5rem;margin-top: 2.5rem;}
.sign-score{ font-size: 1.5rem; text-align: center;margin: 1rem 0;}
.sign-nei{ margin-top: -32%;}
.button a{ width: 45%; display: inline-block; height: 2.5rem; line-height: 2.5rem;border-radius: 5%;background: #fa4747; text-align: center;color: #fff; font-size: 1.5rem; margin: .6rem;}

.qiandao{    width: 100%; height: 100%;
    background: url(../assets/images/titbg.png);
    position: absolute;
    top: 0;
}
.cent{ background: #fff; width: 90%; margin: 30% auto; height: 50%; border-radius: 2rem; padding: 2rem;}
.titlet{ text-align: center;font-size: 1.5rem; line-height: 2rem;color: #000}
.contt{ margin-top: .9rem;line-height: 1.5rem;}
</style>
