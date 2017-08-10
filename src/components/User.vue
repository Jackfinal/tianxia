<template>
  <div class="user">
    <Top></Top>
		<div  style="height:60px;"></div>


        <div class="newcommon_box">
          <table class="indexthr_my "cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td  width="75" style=" vertical-align:top; " class="grzx_back">
                  <div class="grzx_perimg">

                     	<img :src="user.avatar" alt="放头像？" style="border:1px solid #FFFFFF; border-radius:40px;"/>
                  </div>
                </td>
				<td >&nbsp;&nbsp;</td>
                <td class="grzx_back"  >
                  <div class="grzx_pername">
                    <h3><b>{{user.name}}</b>， 您好！</h3>
                    <p></p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table  class="indexthr_mybox"  cellspacing="1" cellpadding="0" bgcolor="#ebe9e9">
            <tbody>
              <tr>
                <td align="center" style="width:33.3%;">
                  <router-link :to="{ name: 'UserAccount' }">
	                  <img src="../assets/images/mycount.png"/>
	                  <h3>我的账户</h3>
                  </router-link>
                </td>
                <td align="center" width="33.3%">
                	<router-link :to="{ name: 'UserOrders' }">
                  	<img src="../assets/images/myorder.png"/>
                  	<h3>我的订单</h3>
                  </router-link>
                </td>
                <td align="center" width="33.3%">
	                <router-link :to="{ name: 'UserScore' }">
	                  <img src="../assets/images/mycoupon.png"/>
	                  <h3>我的积分</h3>
	                </router-link>
                </td>
              </tr>
              <tr>
			  <td align="center" width="33.3%">
                <router-link :to="{ name: 'UserAccount' , params: { id:  1 } }">
                  <img src="../assets/images/operate.png"/>
                  <h3>消费记录</h3>
                  </router-link>
                  </td>

                <td align="center" width="33.3%">
                  <router-link :to="{ name: 'Page', params: { id:  6 }}" >
                  <img src="../assets/images/aboutus.png"/>
                  <h3>关于我们</h3>
                  </router-link>
                </td>
                  <td align="center" width="33.3%">

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
    Top,Footers
  },
  created() {
    this.GetInfo();
  },
  methods: {
    GetInfo() {
      GetUser({userid:1}).then(res=> {
        this.user = res;
        store.dispatch('saveUser', res)
        console.log(store.state.user)
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
