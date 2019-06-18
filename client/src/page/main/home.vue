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
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">

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
          <el-pagination v-if="singleMusicTotal > 0"
            @size-change="singleMusicSizeChange" 
            @current-change="singleMusicCurrentChange"
            :current-page="singleMusicCurrent"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="singleMusicSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="singleMusicTotal">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="歌手" name="songer"> 
          <el-table @row-click="songerRowClick"
            :data="tableData2">
            <el-table-column
              prop="name"
              label="歌手">
            </el-table-column>
            <el-table-column
              label="封面">
              <template slot-scope="scope">
                  <el-image style="width: 40px; height: 40px" :src="scope.row.picUrl" it="cover"></el-image>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="专辑" name="album" >
          <el-table @row-click="albumRowClick"
            :data="tableData3">
            <el-table-column
              prop="name"
              label="专辑名">
            </el-table-column>
            <el-table-column
              prop="artist"
              label="歌手">
            </el-table-column>
            <el-table-column
              label="封面">
              <template slot-scope="scope">
                  <el-image style="width: 40px; height: 40px" :src="scope.row.picUrl" it="cover"></el-image>
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
          tableData2: [],
          tableData3: [],
          singleMusicCurrent: 1, 
          singleMusicSize: 10, 
          singleMusicTotal: 0
        };
      },
      methods: {
        handleClick(activeName) {
          this.seach(activeName,this.searchMusic);
        },
        albumRowClick(row, column, event){
          this.activeName = 'singleMusic';
          musicSearch.searchAlbumMusic({
                albumName: row.name,
                page: this.singleMusicCurrent,
                size: this.singleMusicSize
            }).then(res => {
               if(!res.data.success)
                  this.$message.error(res.data.msg);
              else
              {
                let array = res.data.music;

                this.tableData = [];
                array.forEach(element => {
                    this.tableData.push({name: element.name,id: element.id,tip: element.ar[0].name})
                });
                this.singleMusicTotal = res.data.count;
              }              
            }).catch(e => {
              console.log(e);
            })
        },
        songerRowClick(row, column, event) {
          this.activeName = 'album';
          musicSearch.searchSongerAlbum({
                songer: row.name,
            }).then(res => {
              
               if(!res.data.success)
                  this.$message.error(res.data.msg);
              else
              {
                let array = res.data.music;

                this.tableData3 = [];
                array.forEach(element => {
                    this.tableData3.push({name: element.name,id: element.id,picUrl: element.picUrl,artist: element.artists[0].name})
                });
              }              
            }).catch(e => {
              console.log(e);
            })
        },
        singleMusicSizeChange(size) {
          this.singleMusicSize = size;
          this.singleMusic(this.searchMusic,this.singleMusicCurrent,size)
        },
        singleMusicCurrentChange(page) {
          this.singleMusicCurrent = page;
          this.singleMusic(this.searchMusic,page,this.singleMusicSize)
        },
        singleMusic(value,page,size) {
          musicSearch.searchSingleMusic({
                musicName: value,
                page: page,
                size: size
            }).then(res => {
              
               if(!res.data.success)
                  this.$message.error(res.data.msg);
              else
              {
                let array = res.data.music;

                this.tableData = [];
                array.forEach(element => {
                    this.tableData.push({name: element.name,id: element.id,tip: element.ar[0].name})
                });
                this.singleMusicTotal = res.data.count;
              }              
            }).catch(e => {
              console.log(e);
            })
        },
        searchSonger(value) {
          musicSearch.searchSonger({
                musicName: value,
            }).then(res => {
              
               if(!res.data.success)
                  this.$message.error(res.data.msg);
              else
              {
                let array = res.data.music;

                this.tableData2 = [];
                array.forEach(element => {
                    this.tableData2.push({name: element.name,id: element.id,picUrl: element.picUrl})
                });
              }              
            }).catch(e => {
              console.log(e);
            })
        },
        searchalbum(value) {
          musicSearch.searchAlbum({
                musicName: value,
            }).then(res => {
              
               if(!res.data.success)
                  this.$message.error(res.data.msg);
              else
              {
                let array = res.data.music;

                this.tableData3 = [];
                array.forEach(element => {
                    this.tableData3.push({name: element.name,id: element.id,picUrl: element.picUrl,artist: element.artists[0].name})
                });
              }              
            }).catch(e => {
              console.log(e);
            })
        },
        seach(selTab,value) {          
          if(selTab == 'singleMusic')
          {
            this.singleMusicCurrent = 1;
            this.singleMusic(value,this.singleMusicCurrent,this.singleMusicSize)
          }
          else if(selTab == 'songer')
            this.searchSonger(value)
          else if(selTab == 'album')
            this.searchalbum(value)
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
