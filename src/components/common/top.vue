<template>

    <div class="header_m">
    	<div class="top clearfix">
    		<div class="topleft"><a href="/"><img src="http://txcm.0512iis.com/images/logo.jpg"></a></div>
    		<div class="topright"  @click="showNav(1)">
    			<a href="javascript:void(0)"><img src="http://txcm.0512iis.com/images/btn.jpg" class="js_menuBtn"></a>
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
                  <router-link :to="{ name: 'Newlist', params: { id:  citem.id }}" v-if="item.content == ''">{{citem.name}}</router-link>
                  <router-link :to="{ name: 'Page', params: { id:  citem.id }}" v-else>{{citem.name}}</router-link>
                </li>
      				</ul>
            </li>
            <li v-else >
              <router-link :to="{ name: 'Shoplist', params: { id:  item.id }}" :id="'lia'" >{{item.name}}</router-link>
            </li>

      		</ul>

      	</div>
      	<a href="javascript:void(0)" class="close js_close" @click="showNav(2)">
      		<img src="http://txcm.0512iis.com/images/closebtn.png" width="43" height="43">	</a>
        </div>
        <div id="fade" :style="fadeCss" @click="showNav(2)" class="black_overlay" v-show="fade"></div>
    </div>

</template>

<script>
import store from '../../store'
export default {
  name: 'top',
  data() {
    return {
      fadeCss: {},
      lightStart: {
      },
      lightEnd: {
        'display': 'block',
        'overflow-y': 'scroll',
        'height': '0px',
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
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.lightEnd['height'] = h + 'px'
    this.fadeCss.height = h + 'px'
  }
}
</script>
