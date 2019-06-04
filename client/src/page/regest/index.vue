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

    .demo-ruleFormReg {
        width: 375px;
        display: inline-block;
        vertical-align: middle;
        background-color: white;
        padding: 22px 22px 0 ;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .item label.el-form-item__label {
        color: rgba(69, 104, 255, 1);
    }

    .item .el-input__inner {
        color: white;
        background-color: rgba(0, 0, 0, 0);
    }

    .regestBt {
        width: 100%;
    }

</style>

<template>
    <div class="main">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleFormReg">
            <h4>账号注册</h4>
            <el-divider></el-divider>
            <el-form-item  prop="account">
                <el-input placeholder="请输入账号" v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item  prop="pass">
                <el-input placeholder="请输入密码" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
                <el-input placeholder="请再次输入密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button class="regestBt" type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>    
    </div>
</template>

<script>
  import {regest} from '../../../api/regest.api';

  export default {
    data() {
      var checkaccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          account: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          account: [
            { validator: checkaccount, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              regest(this.ruleForm).then(res => {                  
                if(!res.data.success)
                    this.$message.error(res.data.msg);
                else
                    this.$router.push({path: '/'});
              }).catch(e => {console.log(e);});
          } else {
            return false;
          }
        });
      }
    }
  }
</script>