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
        <div class="demo-ruleForm">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="mail" class="accountForm">
                <h4>找回密码</h4>
                <el-divider></el-divider>
                <el-form-item  prop="account">
                    <el-input placeholder="请输入账号" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item  prop="mail">
                    <el-input placeholder="请输入邮箱" v-model="ruleForm.mail"></el-input>
                </el-form-item>
                <el-form-item  prop="pass">
                    <el-input placeholder="请输入修改的密码" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item  prop="matchCode" >
                    <el-input placeholder="请输入验证码"  v-model="ruleForm.matchCode">
                        <template slot="append"><el-button style="padding:0 5px" type="text" @click="getMatchCode('mail')">获取验证码</el-button></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginBt" type="primary" @click="submitForm('mail')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import {getMatchCode, findPsd} from '../../../api/findPsd.api';

  export default {
      data(){
        var validatemail = (rule, value, callback) => {
            let mainRegExp = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (value === '' || !mainRegExp.test(value))
                callback(new Error('请输入正确邮箱'));
            else 
                callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '')
                callback(new Error('请输入密码'));
            else 
                callback();
        };
        var validatematchCode = (rule, value, callback) => {
            if (value === '')
                callback(new Error('请输入验证码'));
            else 
                callback();
        };
        var validateAccount = (rule, value, callback) => {
            if (value === '')
                callback(new Error('请输入账号'));
            else 
                callback();
        };

        return {
            ruleForm: {
                pass: '',
                mail:'',
                matchCode: '',
                account: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                mail: [
                    { validator: validatemail, trigger: 'blur' }
                ],
                account: [
                    { validator: validateAccount, trigger: 'blur' }
                ],
                matchCode: [
                    { validator: validatematchCode, trigger: 'blur' }
                ]
            }
        };
      },
      methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                findPsd(this.ruleForm).then(res => {                  
                    if(!res.data.success)
                        this.$message.error(res.data.msg);
                    else
                        this.$router.push({path: '/'});
                }).catch(e => {console.log(e);});
            } else {
                return false;
            }
            });
          },
          getMatchCode(formName) {
            this.$refs[formName].validateField('mail',(errorMessage) => {                
                if (!errorMessage) {
                    getMatchCode(this.ruleForm).then(res => {                  
                        if(!res.data.success)
                            this.$message.error(res.data.msg);
                        else
                            this.$message.success('验证码已发送');
                    }).catch(e => {console.log(e);});
                } else {
                    return false;
                }
            });
          }
      },
      created(){
      }
  }
</script>
