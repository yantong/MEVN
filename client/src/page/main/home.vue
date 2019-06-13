<style >
  .searchClass{
    /* border: 1px solid #c5c5c5; */
    border-radius: 20px;
    width: 150px;
  }
</style>

<template>
    <div >  
      <br>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" @change="seach" style="width: 150px;" v-model="searchMusic"></el-input>
      <br><br>
      <audio :src="musicUrl" autoplay controls></audio>
      <br><br>
      <el-table
        :data="tableData"
        style="width: 50%;margin: 0 auto">
        <el-table-column
          prop="name"
          label="歌名">
        </el-table-column>
        <el-table-column
          prop="tip"
          label="歌手">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
            <template slot-scope="scope">
              <el-button
                @click="playMusic(scope.$index, scope.row)">播放</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
      data(){
        return {
          searchMusic: '情非得已',
          tableData: [],
          musicUrl: 'http://m10.music.126.net/20190613214119/dff38ba0228ec712d24257c9e0598e5e/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
        };
      },
      methods: {
        seach(value) {
          axios({
                method: 'get',
                url: `http://localhost:3000/search?keywords= ${value}`, 
            }).then(res => {
              let array = res.data.result.songs;

              this.tableData = [];
              array.forEach(element => {
                // if(this.tableData.length < 10)
                  this.tableData.push({name: element.name,id: element.id,tip: element.artists[0].name})
              });
            })
        },
        playMusic(index, row) {
          axios({
                method: 'get',
                url: `http://localhost:3000/song/url?id= ${row.id}`,
            }).then(res => {
              let data = res.data.data;

              if(data.length)
                this.musicUrl = data[0].url;
            })
        }
      },
      created(){
      }
  }
</script>
