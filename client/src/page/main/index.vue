<style >
    div.home {
        min-height: 100vh;
        overflow: hidden;
        background: linear-gradient(to right, #ffcff9, #79a9ff);
        text-align: center;
        position: relative;
    }

    .content {
        margin: 0 auto;
        width: 980px;
        overflow: hidden;
    }

    .head, .bottom {
        height: 70px;
        box-sizing: border-box;
        background: #242424;
        /* border-bottom: 1px solid #000; */
    }

    .bottom {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1000;
    }

    .head .content {
        display:flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }

    .bottom .content {
        margin: 0 auto;
        width: 980px;
        height: 100%;
        overflow: hidden;
        text-align: left;
    }

    .bottom .content::before {
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        content: '';
    }

    .bottom .content audio {
        display: inline-block;
        vertical-align: middle;
    }

    .selfData {
        display: inline-block;
        color: white;
    }

    .logo {
        width: 176px;
        height: 69px;
        background-position: 0 0;
        background: url('../../assets/topbar.png') no-repeat 0 0;
    }

    .routerView {
        padding-bottom: 90px;
    }
</style>

<template>
    <div class="home">  
        <div class="head">
            <div class="content">
                <h1 class="logo"></h1>
                <div class="selfData">
                    <el-dropdown trigger="click" placement="bottom" @command="dropdownItemClick">
                        <el-image style="width: 30px; height: 30px;borderRadius: 5px;" :src="headPicUrl" fit="cover"></el-image>
                        <br>
                        <label for="#" style="color: white">{{name}}</label>

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user" command="editSelfData">编辑个人信息</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-switch-button"  command="logOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <router-view class="routerView content" @updateMusicUrl="updateMusicUrl"></router-view>
        <div class="bottom">
            <div class="content">
                <audio :src="musicUrl" autoplay controls></audio>
            </div>
        </div>
    </div>
</template>

<script> 
  import * as util from '../../../util'
  import { editSelfData, selfData } from '../../../api/editSelfData.api';

  export default {
      data(){
        return {
            headPicUrl: '',
            name: '',
            musicUrl: ''
        };
      },
      computed: {
      },
      methods: {
          editSelfData() {
            this.$router.push({
                name: 'editSelfData'
            })
          },
          logOut() {
            util.clearAllCookie();
            this.$router.push({
                name: 'Login'
            })
          },
          dropdownItemClick(cmd) {
              this[cmd]();
          },
          updateMusicUrl(url) {
              console.log(url);
              this.musicUrl = url;
          }
      },
      created() {
        selfData().then(res => {
            if(!res.data.success)
                this.$message.error(res.data.msg);
            else
            {              
                this.headPicUrl = res.data.headPic;
                this.name = res.data.name;
            }
        }).catch(e => { console.log(e) });
      }
  }
</script>
