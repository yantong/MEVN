<style >
    div.home {
        min-height: 100vh;
        overflow: hidden;
        background: url('../../assets/login.png');
        text-align: center;
    }

    .head {
        height: 70px;
        box-sizing: border-box;
        background: #242424;
        border-bottom: 1px solid #000;
    }

    .content {
        margin: 0 auto;
        width: 980px;
    }

    /* div.main::before {
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        content: '';
    } */
</style>

<template>
    <div class="home">  
        <div class="head">
            <div class="content">
                <el-image style="width: 30px; height: 30px;borderRadius: 15px;"  @click="editSelfData"
                    src="http://p1.music.126.net/UxWFtuLxyLyS9WKCx87ZTQ==/1371091010352210.jpg?param=30y30" fit="cover"></el-image>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
      data(){
        return {
        };
      },
      methods: {
          editSelfData() {
              this.$router.push({
                name: 'editSelfData'
            })
          }
      }
  }
</script>
