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
        width: 25%;
        display: inline-block;
        vertical-align: middle;
        background-color: white;
        padding: 22px 22px 0 ;
    }

    .item label.el-form-item__label {
        color: rgba(69, 104, 255, 1);
    }

    .item .el-input__inner {
        color: white;
        background-color: rgba(0, 0, 0, 0);
    }

</style>

<template>
    <div class="main">  
        <a href="#" @click="regest">注册</a>  
    </div>
</template>

<script>
  export default {
      data(){
          return {}
      },
      methods: {
          regest(){
            this.$router.push({
                path: '/regest'
            })

            // this.$router.push({ path: 'regest', query: { plan: 'private' }})
          }
      }
  }
</script>
