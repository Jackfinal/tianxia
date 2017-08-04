<template>
  <div class="">
    <div class="footer_nav">
    		<dl v-for="(item, index) in list">
    			<dd @click="showList(index)">{{item.name}}</dd>
    			<dt v-show="item.show1">
    				<ul>
    					<li v-for="(citem, i) in item.child">
                <router-link :to="{ name: 'Page', params: { id:  citem.id }}" v-if="citem.content!=''">{{citem.name}}</router-link>
                <router-link :to="{ name: 'Shoplist', params: { id:  citem.id }}" v-else-if="index=='fw'">{{citem.name}}</router-link>
                <router-link :to="{ name: 'Newlist', params: { id:  citem.id }}" v-else>{{citem.name}}</router-link>
              </li>
    				</ul>
    			</dt>
    		</dl>
    		</div>
    <div class="footer" style="margin-bottom:50px;" v-html="site.site.footer">

    </div>
    <nav class="navbar navbar-default navbar-fixed-bottom footer_nav small-nav">
        <div class="foot_nav btn-group dropup">
            <a :href="'tel:' + site.site.stel">
                <span class="glyphicon glyphicon-share btn-lg" ><img src="../../assets/images/ico1.png"></span>
               手机</a>
        </div>
        <div class="foot_nav"><a :href="'sms:' + site.site.stel"><span class="glyphicon glyphicon-phone btn-lg"><img src="../../assets/images/ico2.png"></span>短信</a></div>

    </nav>

  </div>
</template>
<script>
import store from '../../store'
export default {
  name: 'footer',
  data() {
    return {
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
      list: {},
      display:false
    }
  },
  created() {
    let n1 = this.site.nav[4];
    let n2 = this.site.nav[3];
    let nav1 = this.site.nav[0]
    let nav2 = this.site.nav[1]
    let nav3 = this.site.nav[2]
    let fw = {
      'name': '我们的服务',
      'child': {
        nav1, nav2, nav3
      },
      'show1': false
    }
    let list = {
      n1, fw, n2
    };
    this.list = list
  },
  methods: {
    showList: function(index)
    {

        if(this.list[index]['show1'])
        {
          this.list[index]['show1'] = false;
        }else {
          this.list[index]['show1'] = true;
        }

    }
  }
}
</script>
