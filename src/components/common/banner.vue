<template>
  <div >
    <div class="swiper-container">
    <swipe :auto="4000">
      <swipe-item v-for="(item,index) in site.nbanner"><div class="swiper-slide">
              <a :href="item.url">
          <img width="100%" :src="item.thumb"  class="swiper-no-swiping">
              </a>
      </div></swipe-item>
    </swipe>

  </div></div>
</template>
<script>
import store from '../../store'
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  name: 'banner',

  data() {
    return {
      site: (typeof (store.state.site) == 'string' && store.state.site!='' )?JSON.parse(store.state.site):store.state.site,
    }
  },
  components: {
     Swipe, SwipeItem
  }
}
</script>
<style>
.swiper-container,.mint-swipe,.mint-swipe-item,.mint-swipe-item img{
  height: 250px!important;
}
.swiper-container{
  margin-top: 44px;
    overflow: hidden;
    width: 100%;
    float: left;
}
</style>
