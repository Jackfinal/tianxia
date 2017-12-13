<template>

  <div class="sign">
    <cell
    title=""
    href="/#/Sharelist"
    is-link
    value="我的邀请">
  </cell>
    <div class="sign-banner" ><img src="http://txcm.0512iis.com/images/share.png" @click="share()" /></div>
  </div>
</div>
</template>
<style>
.user img { display:inline;}
</style>
<script>
import calendar from './common/calendar'
import store from '../store'
import {  share } from '../api';
import { Toast,Cell } from 'mint-ui';
export default {
  name: 'Share',
  data() {
    var d = new Date(2017)
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      date: '',
      visible : 0,
    }

  },
  components: {
    calendar,Cell
  },
  created() {
    //this.GetInfo();console.log(this.user);
    let uid = this.GetQueryString1('uid');
    if(this.user && this.user.uid != uid )
    {
    window.location.href='/#/Share?uid=' + this.user.uid
    }
  },
  methods: {
    share() {
      Toast('点击右上角分享给好友');
    },
    sign() {
      share( {userid: this.user.uid} ).then(res=>{
        if(res > 0){
          Toast('签到成功！');
          this.user.isSign = true;
          store.dispatch('saveUser', this.user);
          setTimeout("location.reload()",3000);
        }else {
          Toast('签到失败！');
        }

      })
    },
    GetQueryString1 (name)
    {
        var after = window.location.hash.split("?")[1];
        if(after)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = after.match(reg);
            if(r != null)
            {
                return  decodeURIComponent(r[2]);
            }
            else
            {
                return null;
            }
        }
    }
  }


}

</script>

<style>
body{
  background: #f9d26d;
}
.mint-cell{
  background: none;
position: absolute;
width: 100%;

}
.mint-cell-value {
  color: #fff;
}
.sign{ background: #f9d26d; height: 100%;}
.sign .sign-banner img{ width: 100%;height: 100%;}
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
