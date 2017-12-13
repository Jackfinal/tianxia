<template>
  <div class="user">
		<div><img src="http://txcm.0512iis.com/images/sharelist.png" /></div>


    <div class="common_box" style="padding-bottom: 20px; width:98%; margin:0 auto;margin-top:38px;">



      <table class="wdzh_boxtwo" cellspacing="0" cellpadding="0" style="width: 100%; margin: 5px auto 0px; border: 1px solid rgb(221, 221, 221);">
        <tbody id="rewardDetail" v-infinite-scroll="ShareList"
        infinite-scroll-disabled="loading"
        :infinite-scroll-distance="num"><!-- 奖励明细 -->


           <tr v-for="(item, index) in list">
             <td>{{index+1}}</td>
             <td><img :src="item.userinfo.avatar" width="50" class="avatar" />{{item.userinfo.name}}</td>
             <td v-text="'注册时间：'+item.inputtime"></td>

          </tr>


        </tbody>
      </table>

    </div>
    <div class="positionab"><img src="../assets/images/sharef.png" /></div>

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
import { ShareList } from '../api';
import { InfiniteScroll, Toast } from 'mint-ui';
export default {
  name: 'ShareList',
  data() {
    return {
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      page: 1,
      list: {},
      loading: false,
      num: 10,
      flag: false
    }

  },
  components: {
    Top,Footers
  },
  created() {
  },
  methods: {
    ShareList() {console.log(this.page);
      this.loading = true;
      if(this.flag)return false;
      ShareList({ page: this.page, userid: this.user.uid, limit: this.num }).then(res=> {
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


  }


}

</script>

<style>
html,body{ height: 100%;}
.positionab{ position: absolute;bottom: 0px;}
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
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}
.mint-cell-wrapper{ border:0px!important; background: none;}

</style>
