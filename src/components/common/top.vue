<template>
  <div class="top">

    <div class="header_m">
    	<div class="top clearfix">
    		<div class="topleft"><a href="/"><img src="../../assets/images/c.jpg"></a></div>
    		<div class="topright"  @click="showNav(1)">
    			<a href="javascript:void(0)"><img src="../../assets/images/btn.jpg" class="js_menuBtn"></a>
    		</div>
    	</div>
    </div>

    <div id="light" :style="lightStart" class="white_content">
    	<div class="navbox">

    		<ul class="cd-accordion-menu animated">
    			<li><a href="/">网站首页</a></li>
          <li v-for="(item, index) in site.nav" v-if="typeof item.child == 'object'" class="has-children">
            <label class="group_label" @click="showLi(index)">{{item.name}}</label>
            <ul v-show="item.show"  :data="item.show">
    					<li v-for="citem in item.child">
                <a v-if="item.content == ''" :href="'list/'+citem.id">{{citem.name}}</a>
                <a v-else :href="'page/'+citem.id">{{citem.name}}</a>
              </li>
    				</ul>
          </li>
          <li v-else >
            <a :href="'shoplist/'+item.id" id="lia">{{item.name}}</a>
          </li>

    		</ul>
    	</div>
    	<a href="javascript:void(0)" class="close js_close" @click="showNav(2)">
    		<img src="../../assets/images/closebtn.png" width="43" height="43">	</a></div>
    <div id="fade" class="black_overlay" v-show="fade"></div>



  </div>
</template>

<script>
import store from '../../store'
export default {
  name: 'top',
  data() {
    return {
      lightStart: {
      },
      lightEnd: {
        'display': 'block',
        'overflow-y': 'scroll',
        'height': '974px',
        'left': '30%'
      },
      fade: false,
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site
    }
  },
  methods: {
    showNav: function(status){
      if(status == 1)
      {
        this.lightStart = this.lightEnd;
        this.fade = true;
      }else {
        this.lightStart = {};
        this.fade = false;
      }

    },
    showLi: function(index)
    {
      let nav = this.site.nav;
      if(nav[index]['show'])
      {
        nav[index]['show'] = false;
      }else {
        nav[index]['show'] = true;
      }
      this.site.nav = nav

    }
  },
  created() {
    console.log(this.site.nav);
  }
}
</script>
