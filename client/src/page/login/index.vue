<style >
    div.main {
        height: 100vh;
        overflow: hidden;
        background: url('../../assets/login.png');
        text-align: center;
    }

    div.main::before, .type-devider::before {
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        content: '';
    }

    .demo-ruleForm, .type-devider div {
        display: inline-block;
        vertical-align: middle;
    }

    .accountForm {
        width: 375px;
        box-sizing: border-box;
        display: inline-block;
        background-color: white;
        padding: 22px 22px 0 22px;
        border-radius: 5px;
    }

    .item label.el-form-item__label {
        color: rgba(69, 104, 255, 1);
    }

    .item .el-input__inner {
        color: white;
        background-color: rgba(0, 0, 0, 0);
    }

    .loginBt {
        width: 100%;
    }

    .type-devider {
        margin: 22px 0;
    }

    .type-devider div {
        display: inline-block;
    }

    .loginType img {
        width: 44px;
        height: 44px;
        margin: 0 10px;
    }

</style>

<template>
    <div class="main">  
        <div class="demo-ruleForm" v-if="loginWay == 'account'">
            <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="accountForm">
                <h4>账号密码登录</h4>
                <el-divider></el-divider>
                <el-form-item  prop="account" key="accountAccount">
                    <el-input placeholder="请输入账号" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item  prop="pass" key="accountPass">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginBt" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form> 
            <div class="type-devider">
                <div style="width: 33.3%;height: 1px;backgroundColor: #898989"></div>
                <div style="width: 33.4%;color: #898989">其他方式</div>
                <div style="width: 33.3%;height: 1px;backgroundColor: #898989"></div>
            </div>
            <div class="loginType">
                <img @click="changloginway('account')" v-if="loginWay == 'phone'" src="../../assets/icon_mail_pc.svg" alt="#">
                <img @click="changloginway('phone')" v-if="loginWay == 'account'" src="../../assets/icon_phone_pc.svg" alt="#">
                <img src="../../assets/icon_qq_pc.svg" alt="#">
                <img src="../../assets/icon_weixin_pc.svg" alt="#">
            </div>
            <div>
                <a style="float: left;textDecoration: none;fontSize: 12px;color: #406599;" href="#" @click="regest">注册</a>
                <a style="float: right;textDecoration: none;fontSize: 12px;color: #406599;" href="#" @click="findPass">忘记密码</a>
            </div>        
        </div>
        <div class="demo-ruleForm" v-if="loginWay == 'phone'">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="phoneForm" class="accountForm">
                <h4>手机验证码登录</h4>
                <el-divider></el-divider>
                <el-form-item  prop="phoneNum" key="phoneNum">
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phoneNum"></el-input>
                </el-form-item>
                <el-form-item  prop="matchCode" key="phoneMatchCode">
                    <el-input placeholder="请输入验证码"  v-model="ruleForm.matchCode">
                        <template slot="append"><el-button style="padding:0 5px" type="text" @click="getMatchCode('phoneForm')">获取验证码</el-button></template>
                    </el-input>
                </el-form-item>
                <el-form-item  prop="picCode">
                    <el-input placeholder="请输入图片码"  v-model="ruleForm.picCode" >
                        <template slot="append">                
                            <img :src="picCode" @click="getPicCode" alt="#">
                        </template>             
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginBt" type="primary" @click="submitForm('phoneForm')">登录</el-button>
                </el-form-item>
            </el-form> 
            <div class="type-devider">
                <div style="width: 33.3%;height: 1px;backgroundColor: #898989"></div>
                <div style="width: 33.4%;color: #898989">其他方式</div>
                <div style="width: 33.3%;height: 1px;backgroundColor: #898989"></div>
            </div>
            <div class="loginType">
                <img @click="changloginway('account')" v-if="loginWay == 'phone'" src="../../assets/icon_mail_pc.svg" alt="#">
                <img @click="changloginway('phone')" v-if="loginWay == 'account'" src="../../assets/icon_phone_pc.svg" alt="#">
                <img src="../../assets/icon_qq_pc.svg" alt="#">
                <img src="../../assets/icon_weixin_pc.svg" alt="#">
            </div>
            <div>
                <a style="float: left;textDecoration: none;fontSize: 12px;color: #406599;" href="#" @click="regest">注册</a>
                <a style="float: right;textDecoration: none;fontSize: 12px;color: #406599;" href="#" @click="findPass">忘记密码</a>
            </div>
        </div>
    </div>
</template>

<script>
  import {login,getCode,phoneLogin,getPiccode} from '../../../api/login.api';

  export default {
      data(){
        var checkaccount = (rule, value, callback) => {
            if (!value) 
                return callback(new Error('账号不能为空'));
            else 
                callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '')
                callback(new Error('请输入密码'));
            else 
                callback();
        };
        var validatephoneNum = (rule, value, callback) => {
            if (value === '' || value.length != 11)
                callback(new Error('请输入正确手机号'));
            else 
                callback();
        };
        var validatematchCode = (rule, value, callback) => {
            // if (value === '')
            //     callback(new Error('请输入验证码'));
            // else 
                callback();
        };
        var validatepicCode = (rule, value, callback) => {
            if (value === '')
                callback(new Error('请输入图片码'));
            else 
                callback();
        };

        return {
            loginWay: 'account',
            picCode: '',
            ruleForm: {
                pass: '',
                account: '',
                phoneNum:'',
                matchCode: '',
                picCode: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                account: [
                    { validator: checkaccount, trigger: 'blur' }
                ],
                phoneNum: [
                    { validator: validatephoneNum, trigger: 'blur' }
                ],
                matchCode: [
                    { validator: validatematchCode, trigger: 'blur' }
                ],
                picCode: [
                    { validator: validatepicCode, trigger: 'blur' }
                ]
            }
        };
      },
      methods: {
          regest(){
            this.$router.push({
                name: 'Regest'
            });
          },
          findPass(){
            this.$router.push({
                name: 'findPsd'
            })
          },
          changloginway(loginWay) {
            this.loginWay = loginWay;
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let req;

                if(this.loginWay == 'account')
                    req = login(this.ruleForm);
                else if(this.loginWay == 'phone')
                    req = phoneLogin(this.ruleForm);

                req.then(res => {                  
                    if(!res.data.success)
                        this.$message.error(res.data.msg);
                    else
                        this.$router.push({ name: 'homeIndex' });
                }).catch(e => {console.log(e);});
            } else {
                return false;
            }
            });
          },
          getMatchCode(formName) {
            this.$refs[formName].validateField('phoneNum',(errorMessage) => {                
                if (!errorMessage) {
                    getCode(this.ruleForm).then(res => {                  
                        if(!res.data.success)
                            this.$message.error(res.data.msg);
                        else
                            this.$message.success('验证码已发送');
                    }).catch(e => {console.log(e);});
                } else {
                    return false;
                }
            });
          },
          getPicCode() {
              getPiccode().then(res => {                  
            if(!res.data.success)
                this.$message.error(res.data.msg);
            else
                this.picCode = 'data:image/jpg;base64,'+ res.data.content;
            }).catch(e => {console.log(e);});
          }
      },
      created(){
          this.getPicCode();
      }
  }
</script>
