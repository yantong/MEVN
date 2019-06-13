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
        overflow: hidden;
        display:flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;
    }

    /* div.content::before {
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        content: '';
    } */

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
        <router-view></router-view>
    </div>
</template>

<script> 
  import * as util from '../../../util'
  import { editSelfData, selfData } from '../../../api/editSelfData.api';

  export default {
      data(){
        return {
            headPicUrl: '',
            name: ''
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
