<style >
  .searchClass{
    border-radius: 20px;
    width: 150px;
  }
</style>

<template>
    <div >  
      <br>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" @change="seach(activeName,$event)" style="width: 150px;" v-model="searchMusic"></el-input>
      <br><br>
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="单曲" name="singleMusic">
          <el-table
            :data="tableData">
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
        </el-tab-pane>

        <el-tab-pane label="歌手" name="songer">
          <el-table
            :data="tableData">
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
        </el-tab-pane>

        <el-tab-pane label="专辑" name="aibum">
          <el-table
            :data="tableData">
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
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
  import axios from 'axios';
  import * as musicSearch from '../../../api/musicSearch.api';

  export default {
      data(){
        return {
          activeName: 'singleMusic',
          searchMusic: '',
          tableData: [],
        };
      },
      methods: {
        handleClick(tab, event) {
        },
        seach(selTab,value) {
          musicSearch.searchSingleMusic({
                musicName: value,
            }).then(res => {
              
               if(!res.data.success)
                  this.$message.error(res.data.msg);
              else
              {
                console.log(res.data);
                
                let array = res.data.music;

                this.tableData = [];
                array.forEach(element => {
                    this.tableData.push({name: element.name,id: element.id,tip: element.ar[0].name})
                });
              }              
            }).catch(e => {
              console.log(e);
            })
        },
        playMusic(index, row) {
          axios({
                method: 'get',
                url: `http://localhost:3000/song/url?id= ${row.id}`,
            }).then(res => {
              let data = res.data.data;

              if(data.length)
              {
                this.$emit('updateMusicUrl',data[0].url)
              }
            }).catch(e => {
              console.log(e);
            })
        }
      },
      created(){
      }
  }
</script>
