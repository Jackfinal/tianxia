<template>
  <div class="">
    <Top></Top>
    <banner></banner>
    <div class="m_new_t clearfix">
      <h3 class="float-l">{{info.name}}</h3>
    </div>
    <div class="abtextbox" style="padding-top:10px;" v-html="info.content">
    </div>

    <div class="newsdetailtextbox" v-if="info.id == 3 || info.id == 4">
    	<div class="newtextbg">
    		<h4>{{content.title}}</h4>
    		<h5>上传于：2017-07-15</h5>
    	</div>
    	<div align="justify" v-html="content.content">

      </div>

     </div>
     <div class="text" v-else-if="info.id == 1">
            <!-- 2016-01-11  新增开始 -->
           	<p><span class="srare_we" id="remarkChose">我们的产品（切换选项查看价格变化）</span></p>

            	<div class="choice_o">
		            <span style="font-size: 13px;margin: 15px 0 0 10px;">
		              挂靠地址:
		            </span>
		            <ul>

		            		<li:class="'cho_r option1' + selectGk0">
	            			<a href="javascript:void(0);" @click="selectGk(0)" >不需要</a>
	            			</li>
                    <li :class="'cho_r option1' + selectGk1">
	            			<a href="javascript:void(0);" @click="selectGk(1)" >需要</a>
	            			</li>

		            </ul>
		        </div>



            	<div class="choice_o">
		            <span style="font-size: 14px;margin: 4px 0 0 10px;">
		              {{content.extend.sxmc}}
		            </span>
		            <ul>

		            		<li v-if="content.extend.nrjjg" class="cho_r option2" v-for="item in content.extend.nrjjg">
	            			<a href="javascript:void(0);">{{item.name}}</a>
	            			</li>


		            </ul>
		        </div>
		    <!-- 2016-01-11  新增结束 -->
                <p style="display: inline-block;margin-top: 10px;">
                    价格： <span id="price" class="span1" style="font-size:16px;color:#F56400;">{{content.price}}元起</span>
                </p>
                <p>
                    <span class="span1" id="priceDesc"></span>
                </p>

                <div align="justify" v-html="content.content">

                </div>


            </div>

    <Footers></Footers>

  </div>
</template>

<script>
import Top from './common/top'
import banner from './common/banner'
import Footers from './common/footer'
import store from '../store'
import { InfiniteScroll } from 'mint-ui';
import { GetInfo } from '../api'
export default {
  name: 'Shownew',
  data () {
    return {
      info: {},
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      content: {},
      selectGk:''
    }
  },
  created() {
    let id = (this.$route.params.id);

    this.loadMore(id);


  },
  methods: {
    loadMore(id) {
      if(!id)return false;
      this.loading = true;
      GetInfo({id}).then(res=> {
        this.content = res
        console.log(res);
        this.getInfo(this.content.catid);

      })
    },
    getInfo(catid) {
      for(let i in this.site.nav)
      {
        let temp = this.site.nav[i];
        if(temp.id == catid)
        {
          this.info = temp;
          break;
        }
      }
    },
    selectGk(type) {
      this.selectGk0 = ''
      this.selectGk1 = ''
      if(type == 0)
      {
        this.selectGk0 = 'selected'
      }else {
        this.selectGk1 = 'selected'
      }

    }
  },
  components: {
    banner, Top, store, Footers, InfiniteScroll
  }
}
</script>
