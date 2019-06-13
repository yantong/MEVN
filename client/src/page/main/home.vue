<style >
</style>

<template>
    <div >  
        homeContent  
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
      data(){
        return {
        };
      },
      methods: {
      },
      created(){
        axios({
                method: 'get',
                url: 'http://musicapi.leanapp.cn/search/multimatch?keywords= beyond',
            }).then(res => {
              console.log(res);
            })

        // const url = `http://musicapi.leanapp.cn/search/multimatch?keywords= beyond`
        // fetch(url).then(function(res) {
        //   console.log(res);
        // })
      }
  }
</script>
