<template>
  <div class="hello" @mouseover="mouseIn" @mouseout="mouseO">
    <div :style="containerStyle">
      <div :style="ulStyle" ref="box">
        <div v-for="(item , index) in img_data"
             :key="index"
             :style="liStyle">
          <img :src="item.thumb" alt=""
               class="imgStyle">
          <div :style="txtStyle">{{item.title}}<br />{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    props: {
      type: {
        type: String,
        default: 'left'
      },
      speed: {
        type: Number,
        default: 20,
      },
      imgData: {
        type: Array
      },
      margin: {
        type: String,
        default: '20px'
      },
      txtPos: {
        type: Array,
        default: ['10%', '10%']
      }
    },
    data () {
      return {
        containerStyle: {
          width: '',
          height: '',
          overflow: 'hidden',
          zIndex: 999,
          position: 'relative'
        },
        ulStyle: {
          position: 'absolute',
          top: '0',
          height: '100%',
          width: '',
        },
        liStyle: {
          float: 'left',
          width: '150px',
          height: '100%',
          position: 'relative',
          paddingLeft: '20px',
          paddingTop: '20px',
        },
        txtStyle: {
          //position: 'absolute',
          //bottom: '0px',
          //left: '20px',
          //zIndex: '10000',
            width: '150px',
          textAlign: 'center'
        },
        timer: {},
        img_data: {}
      }
    },
    created(){
      let arr = [];
      this.imgData.forEach(item => {
        arr.push(item)
      });
      this.imgData.forEach(item => {
        arr.push(item)
      });
      this.img_data = arr;
      this.containerStyle.width = '100%';
      this.containerStyle.height = '100%';
      this.ulStyle.height = '100%';
      this.ulStyle.width = '100%';
      this.txtStyle.left = this.txtPos[0];
      this.txtStyle.bottom = this.txtPos[1];
      if (this.type === 'left') {
        this.liStyle.paddingTop = '0'
        this.liStyle.width = '150px';
      } else {
        this.liStyle.width = '150px';
        this.liStyle.height = 'auto';
        this.liStyle.paddingLeft = '0'
      }
    },
    mounted(){
      this.trans(this.type)
    },
    methods: {
      trans(type){
        let _this = this;
        let allImgLength;
        if (type === 'left') {
          allImgLength = this.img_data.length * 150;
          this.ulStyle.width = allImgLength + 'px'
        } else {
          allImgLength = this.img_data.length * this.$el.clientHeight;
          this.ulStyle.height = allImgLength + 'px'
        }
        this.timer = setInterval(function () {
          let num = 0;
          try {
            num = Number(_this.$refs.box.style[type].replace('px', ''));

            if (num <= -allImgLength / 2) {
              num = 0
            }console.log(_this.$refs.box);
            _this.$refs.box.style[type] = num - 1 + 'px'
          }
          catch (e) {
          }
        }, this.speed)
      },
      mouseIn(){
        clearInterval(this.timer);
      },
      mouseO(){
        this.trans(this.type)
      }
    }
  }
</script>

<style scoped>
  .imgStyle {
    width: 150px;
    height: 100px;
    display: block
  }
</style>
