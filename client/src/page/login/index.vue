<style >
    div.main {
        height: 100vh;
        overflow: hidden;
        background: url('../../assets/login.png');
        text-align: center;
    }

    div.main::before {
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        content: '';
    }

    .demo-ruleForm {
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

</style>

<template>
    <div class="main">  
        <div class="demo-ruleForm" v-if="loginWay == 'account'">
            <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="accountForm">
                <h4>账号密码登录</h4>
                <el-divider></el-divider>
                <el-form-item  prop="account">
                    <el-input placeholder="请输入账号" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item  prop="pass">
                    <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginBt" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form> 
            <br>
            <a href="#" @click="regest">注册</a>
        </div>
        <div class="demo-ruleForm" v-if="loginWay == 'phone'">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="phoneForm" class="accountForm">
                <h4>手机验证码登录</h4>
                <el-divider></el-divider>
                <el-form-item  prop="phoneNum">
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phoneNum"></el-input>
                </el-form-item>
                <el-form-item  prop="matchCode">
                    <el-input placeholder="请输入验证码"  v-model="ruleForm.matchCode" >
                        <template slot="append"><el-button style="padding:0 5px" type="text" @click="getMatchCode('phoneForm')">获取验证码</el-button></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginBt" type="primary" @click="submitForm('phoneForm')">登录</el-button>
                </el-form-item>
            </el-form> 
            <br>
            <a href="#" @click="regest">注册</a>
        </div>
    </div>
</template>

<script>
  import {login,getCode} from '../../../api/login.api';

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
        };var validatematchCode = (rule, value, callback) => {
            if (value === '')
                callback(new Error('请输入验证码'));
            else 
                callback();
        };
        return {
            loginWay: 'phone',
            ruleForm: {
                pass: '',
                account: '',
                phoneNum:'',
                matchCode: ''
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
                ]
            }
        };
      },
      methods: {
          regest(){
            this.$router.push({
                path: '/regest'
            })
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                login(this.ruleForm).then(res => {                  
                    if(!res.data.success)
                        this.$message.error(res.data.msg);
                    else
                        this.$router.push({path: '/home'});
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
                            this.$router.push({path: '/home'});
                    }).catch(e => {console.log(e);});
                } else {
                    return false;
                }
            });
          }
      }
  }
</script>
