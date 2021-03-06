import Vue from 'vue';
import router from '../router'
import vueResource from 'vue-resource'
import store from '../store';
import { Indicator,Toast } from 'mint-ui';
import queryString from 'queryString';

Vue.use(vueResource);

const appid = 'wxe6ab26eb9276d633';
const secret = '0d1750587901b3570a84b6b0ca4e8dff';

let accessToken = store.state.accessToken;

const API_ROOT = process.env.API_ROOT;

async function fetch(service, data, loading = false)
{
  let accessToken = store.state.accessToken;
  const user = store.state.user

  if(!accessToken)
  {
    accessToken = await getData('AccessToken.GetAccessToken',{appid, secret});
    store.dispatch('saveAccssToken', accessToken)
  }
  return getData(service, data, loading)

}
async function getData(service, datas, loading)
{
  const data = {
    service,
    access_token: store.state.accessToken,
    ...datas
  }
  if(loading)
  {
    Indicator.open('Loading...');
  }

  return new Promise((resolve, reject)=>{
    Vue.http.options.emulateJSON = true;
    Vue.http.post(API_ROOT + 'index.php', data).then(response => {
      Indicator.close();
      if (response.status == 200) {
        let data = response.data
        if(data.ret == 200)
        {
          resolve(data.data.result);
          return;
        }else if (data.ret == 401 || data.ret == 400){
          Toast({
            message: data.msg,
            position: 'bottom',
            duration: 5000
          });
        }else if (data.ret == 402) {
          const accessToken = store.state.accessToken
          const user = store.state.user;
          /*if (user && accessToken) {
            return fetch('AccessToken.UpdateAccessToken', { appid, secret }).then(res => {
              return fetch(service, datas)
            })
          }else if (!accessToken) {*/
            return fetch('AccessToken.GetAccessToken', { appid, secret }).then(res => {
              store.dispatch('saveAccssToken', response.data.data.result)
              return fetch(service, datas)
            })
          //}
        }else {
          Toast({
            message: data.msg,
            position: 'bottom',
            duration: 5000
          });
          //window.location.href= '/';
        }


      }

      reject(data)

    },error => {
      Toast({
        message: '网络错误！'+JSON.stringify(error),
        position: 'bottom',
        duration: 5000
      });
    })
  })
}
//暴露外围函数
export function RedirectWeixin(data)
{
  let user = store.state.user;
  if(!user.id)
  {
    var ret = fetch('Weixin.Redirect_weixin',data,true);
    ret.then(res => {
      window.location.href=res;
    })
  }
}
//获取banner
export function GetIndex()
{
  return fetch('Index.GetIndex',{});
}
//获取详情
export function GetInfo(data){
  return fetch('Index.GetInfo',data);
}
//获取列表
export function GetList(data){
  return fetch('Index.GetList',data);
}
//获取用户信息
export function GetUser(data){
  return fetch('User.getBaseInfo',data);
}
export function GetScore(data){
  return fetch('User.GetScore',data);
}
export function GetAccount(data){
  return fetch('User.GetAccount',data);
}
//发送验证码
export function GetCode(data){
  return fetch('User.GetCode',data);
}
//提现申请
export function ApplyMoney(data){
  return fetch('User.ApplyMoney',data);
}
//充值
export function Recharge(data){
  return fetch('User.Recharge',data);
}
export function GetOrders(data){
  return fetch('User.GetOrders',data);
}
export function CacelOrders(data){
  return fetch('User.CacelOrders',data, true);
}
//图片上传
export function uploader(data) {
   return fetch('Default.UploadBase64', data)
}
//更新会员字段
export function saveField(data) {
  return fetch('User.saveField1', data)
}

export function getArea(){
  return fetch('Default.getArea')
}

export function weiXinRedirect(data)
{
  return fetch('weixin.redirect', data, true)
}
export function orderPay(data)
{
  return fetch('weixin.orderPay', data, true)
}
//支付
export function weiXinPay(data)
{
  return fetch('weixin.weiXinPay', data, true)
}
//支付成功
export function weiXinPaySuccess(data)
{
  return fetch('weixin.weiXinPaySuccess', data, true)
}
//积分列表
export function getCreditsLog(data)
{
  return fetch('User.getCreditsLog', data, true)
}
//提交表单
export function addNewsForm(data)
{
  return fetch('User.addNewsForm', data, true)
}
//兑换积分
export function exchange(data)
{
  return fetch('User.exchange', data, true)
}


//签到
export function sign(data)
{
  return fetch('User.sign', data, true)
}
export function signlist(data)
{
  return fetch('User.signList', data, true)
}
export function share(data)
{
  return fetch('Index.Share', data, true)
}
export function ShareList(data){
  return fetch('User.ShareList',data);
}
