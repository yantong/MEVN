<style >
    .editSelfDataForm {
        width: 375px;
        display: inline-block;
        vertical-align: middle;
        background-color: white;
        padding: 22px 22px 0 ;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<template>
    <div>  
        <el-form :model="selfDataForm" ref="selfDataForm" label-width="100px" class="editSelfDataForm">
            <el-form-item
                label="用户名"
                prop="name"
                :rules="[
                { required: true, message: '用户名不能为空'},
                ]"
            >
                <el-input  v-model.number="selfDataForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item 
                label="头像"
                prop="imageUrl"
                :rules="[
                { required: true, message: '头像不能为空'},
                ]"
            >
                <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action=""
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                    <img v-if="selfDataForm.imageUrl" :src="selfDataForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-button type="primary" @click="submitForm('selfDataForm')" style="marginBottom: 24px">提交</el-button>
        </el-form>
    </div>
</template>

<script>
  import { editSelfData } from '../../../api/editSelfData.api';
  import * as util from '../../../util'

  export default {
    data() {
      return {
        selfDataForm: {
          name: '',
          imageUrl: '',
          img: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
              let params = new FormData();
              params.append('name', _this.selfDataForm.name);
              params.append('picFile',  _this.selfDataForm.img);

              editSelfData(params).then(res => {
                if(!res.data.success)
                    _this.$message.error(res.data.msg);
                else
                {
                    _this.$message.success("设置成功");
                     this.$router.push({
                        name: 'homeIndex'
                    })
                }
              })
          } else {
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
      },
      beforeAvatarUpload(file) {
        const _this = this;
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }

        this.selfDataForm.img = file;
        this.selfDataForm.imageUrl = window.URL.createObjectURL(file);

        return false;
      }
    }
  }
</script>

