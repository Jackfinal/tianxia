<template>
  <div class="">
    <Top></Top>
    <div style="height:60px;"></div>
    <div class="main">
    <form id="verifySubmit" method="POST" action="">
    	<input type="hidden" value="oHFWHtwYqLCfKkRJLm2jnmbxQBnc" name="openid"/>
    	<input type="hidden" value="放逐-网站建设" name="nickname"/>
      	<div class="reg" style="padding-top:40px;">
      	<div id="verify">
      	   <!-- 未认证 -->

      	    	<div id="verify">
      		    	<ul>
      		        	<li><label color=green ><i>*</i>微信昵称</label>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" v-model="user.name"></span></li>
      		            <li><label for=""><i>*</i>联系人</label>&nbsp;&nbsp;&nbsp;<input type="textfield" id="mobilephone" :disabled="alldisabled" v-model="contactname" name="mobilephone" style="font-size:17px; width:150px; background-color:#F7F7F7;line-height:29px; height:29px;" > </li>
      		            <li><label for=""><i>*</i>公司名称</label>&nbsp;&nbsp;&nbsp;<input type="textfield" id="mobilephone" :disabled="alldisabled" v-model="company" name="mobilephone" style="font-size:17px; width:150px; background-color:#F7F7F7;line-height:29px; height:29px;" >  </li>
      		            <li><label for=""><i>*</i>公司地址</label>&nbsp;&nbsp;&nbsp;<input type="textfield" id="mobilephone" :disabled="alldisabled" v-model="companyaddress" name="mobilephone" style="font-size:17px; width:150px; background-color:#F7F7F7;line-height:29px; height:29px;" > </li>

      					      <li><label for=""><i>*</i>手机号码</label>&nbsp;&nbsp;&nbsp;<input type="textfield" :disabled="disabled" id="mobilephone" name="mobilephone" style="font-size:17px; width:150px; background-color:#F7F7F7;line-height:29px; height:29px;" minlength="11" maxlength="11" v-model="mobilephone"></li>
      		            <li><label for=""><i>*</i>短信验证</label>&nbsp;&nbsp;&nbsp;<input type="textfield" disabled="alldisabled" id="code" v-model="code" name="code" style="width:60px; font-size:17px; background-color:#F7F7F7; line-height:29px; height:29px;" minlength="4" maxlength="4" />
        		            <label id="rcode" style="border-right:none; width:80px; float:right; display:block;" @click="getCode();"><i>&nbsp;&nbsp;&nbsp;</i>获取验证码</label>
      		            <label id="timer" style="border-right:none; width:80px; float:right;" v-show="timer" ><i>&nbsp;&nbsp;&nbsp;</i><span id="times" v-text="lasttime"></span>秒后获取</label></li>
      		        </ul>
      				<br>
      		        <p class="tc pb22" style="padding-top:30px;"><input id="submitid" type="button" @click="saveWeixinVerfy();" style="width:100%;background:#f56400 !important;border: 1px solid #FFF !important;" :value="button" class="reg-btn msf" ></p>
      		    </div>

      	    <!-- 已认证 -->


          </div>
          </div>
      </form>

    </div>
    <Footers></Footers>

  </div>
</template>

<script>
import '../assets/css/m-login.css'
import Top from './common/top'
import Footers from './common/footer'
import store from '../store'
import { RedirectWeixin, weiXinRedirect, GetCode, saveField, GetIndex } from '../api'
import { Indicator,Toast } from 'mint-ui';
export default {
  name: 'Login',
  data () {
    return {
      info: {},
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      user: (typeof (store.state.user) == 'string' && store.state.user!='')?JSON.parse(store.state.user):store.state.user,
      mobilephone: '',
      timer: false,
      lasttime: 60,
      disabled: false,
      contactname: '',
      company: '',
      companyaddress: '',
      code: '',
      redirect: '',
      alldisabled: false,
      button: '立即认证'
    }
  },
  created() {
    Indicator.open('Loading...');

    GetIndex().then(res=> {
      this.site = res;
      store.dispatch('saveSite', this.site)
    })

    this.redirect = (this.$route.query.redirect);
    if(!this.redirect)this.redirect = 'User'
    let code = this.getQueryString('code');
    if(this.user.ismobile == 1 && this.user.phone)
    {
      this.alldisabled = true;
      this.disabled = true
      this.button = '解除认证'

    }
    if(!code)
    {
      RedirectWeixin();
    }
    if(this.user.uid)
    {
      this.contactname = this.user.contactname;
      this.companyaddress = this.user.companyaddress;
      this.company = this.user.company;
      this.mobilephone = this.user.phone;
      return true;
    }
    weiXinRedirect({code:code}).then(res=> {
        store.dispatch('saveUser', res);
        this.user = res
        //判断是否手机验证
        if(res.ismobile == 1 && res.phone)
        {
          this.$router.push( { name: this.redirect } )
        }
        setTimeout(this.lasttime, 1000);
        Indicator.close();
      })
  },

  methods: {
    saveWeixinVerfy() {
      if(this.alldisabled)//解除认证
      {

        return true;
      }
      if (this.mobilephone == "") {
    		Toast("手机号码不能为空！");
    		return false;
    	}
      if (this.contactname == "") {
    		Toast("联系人不能为空！");
    		return false;
    	}
      if (this.company == "") {
    		Toast("公司名称不能为空！");
    		return false;
    	}
      if (this.companyaddress == "") {
    		Toast("公司地址不能为空！");
    		return false;
    	}
      if (this.code == "") {
    		Toast("验证码不能为空！");
    		return false;
    	}
      let data = {
        phone: this.mobilephone,
        contactname: this.contactname,
        company: this.company,
        companyaddress: this.companyaddress,
        code: this.code,
        userid: this.user.uid
      }
      saveField(data).then(res=> {
        if(res != -1)
        {
          store.dispatch('saveUser', res);
          this.user = res
          Toast("认证成功！");
          router.push(this.redirect)
        }else {
          Toast("认证失败！");
        }
      })
    },
    getCode() {
      if(this.alldisabled)return false;
      if(this.lasttime < 60)
      {
        Toast(this.lasttime + "秒以后点击！");
        return false;
      }
      if (this.mobilephone == "") {
    		Toast("手机号码不能为空！");
    		return false;
    	}
    	if (this.mobilephone != "") {
    		var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    		if (!reg.test(this.mobilephone)) {
    			Toast("请输入11位手机号码！");
    			return false;
    		}
    	}
      this.disabled = true
      var _this = this
      //请求发送短信
      GetCode({mobile: this.mobilephone, userid: this.user.uid}).then(res=>{

        if(res.error_code == 0)
        {
          this.timer = true;
          let sh = setInterval(function(){
            if(_this.lasttime <= 0)
            {
              _this.lasttime = 60
              clearInterval(sh);
              _this.disabled = false
            }else {
              _this.lasttime--;
            }
          }, 1000);
        }else {
          this.disabled = false;
          Toast(res.reason);
        }

      })
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  components: {
    Top, store, Footers
  }
}
</script>
