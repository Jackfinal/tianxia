<template>
  <div class="sign">
    <div class="sign-banner"><img src="../assets/images/sign-banner.png" /></div>
    <div class="sign-nei">
      <div class="sign-txt">今日已签到</div>
      <div class="sign-pace"><img :src="user.avatar" />{{user.name}}</div>
      <div class="sign-score">我的积分：{{user.score}}</div>
    </div>

    <calendar></calendar>
    <div class="button">
      <a href="">签到明细</a>
      <a href="">签到规则</a>
    </div>

  </div>

</template>
<style>
.user img { display:inline;}
</style>
<script>
import '../assets/css/style2.css'
import Top from './common/top'
import Footers from './common/footer'
import calendar from './common/calendar'
import store from '../store'
import { GetUser } from '../api';
export default {
  name: 'User',
  data() {
    var d = new Date(2017)
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,

    }

  },
  components: {
    Top,Footers,calendar
  },
  created() {
    this.GetInfo();
  },
  methods: {
    GetInfo() {
      this.user = {}
      this.user.uid = 22
      GetUser({userid:this.user.uid}).then(res=> {
        this.user = res;
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
.sign{ background: #f6f6f6}
.sign-txt{ text-align: center; font-size: 2rem;color: #c12434;}
.sign-pace img{border-radius: 50%; margin-right: 10px; border: 1px solid #30b3b7; width: 20%}
.sign-pace{ text-align: center; line-height: 6rem;font-size: 1.5rem;margin-top: 2.5rem;}
.sign-score{ font-size: 1.5rem; text-align: center;margin: 1rem 0;}
.sign-nei{ margin-top: -32%;}
.button a{ width: 45%; display: inline-block; height: 2.5rem; line-height: 2.5rem;border-radius: 5%;background: #fa4747; text-align: center;color: #fff; font-size: 1.5rem; margin: .6rem;}
</style>
