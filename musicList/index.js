const axios = require('axios');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";

// http://localhost:3000  http://musicapi.leanapp.cn

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;

    let dbase = db.db("MEVN");

    // 5001
    let songerTypes = [1001];
    // let songerTypes = [1001,1002,1003,2001,2002,2003,6001,6002,6003,7001,7002,7003,4001,4002,4003];

    (async function () {
        for (const index in songerTypes) {
            let songerType = songerTypes[index];
            let searchFinish = false;
            let limit = 20;
            let offset = 0;

            //要对error做处理
            
    
            while (!searchFinish) 
            {
                let res = await axios({
                    method: 'get',
                    url: `http://localhost:3000/artist/list?cat=${songerType}&limit=${limit}&offset=${offset}`, 
                }).catch(e => {console.log(e);});

                let array = (res && res.data && res.data.artists) ? res.data.artists : null;
                if(!array || array.length == 0)
                {
                    searchFinish = true;
                }
        
                if(array) {
                    for (let index = 0; index < array.length; index++) {
                        let element = array[index];

                        dbase.collection("songer").insertOne(element, function(err, result) {
                            if (err) throw err;
                        });

                        let songSearchFinish = false;
                        let songlimit = 20;
                        let songoffset = 0;

                        while (!songSearchFinish)
                        {
                            let res = await axios({
                                method: 'get',
                                url: `http://localhost:3000/artist/album?id=${element.id}&limit=${songlimit}&offset=${songoffset}`, 
                            }).catch(e => {console.log(e);});

                            let songsArray = (res && res.data && res.data.hotAlbums) ? res.data.hotAlbums : null;
                            if(!songsArray || songsArray.length == 0)
                            {
                                songSearchFinish = true;
                            }

                            if(songsArray) {
                                for (let index = 0; index < songsArray.length; index++) {
                                    const element = songsArray[index];

                                    let res = await axios({
                                        method: 'get',
                                        url: `http://localhost:3000/album?id=${element.id}`, 
                                    }).catch(e => {console.log(e);});

                                    // console.log(res);
                                    

                                    

                                    let songs = (res && res.data && res.data.songs) ? res.data.songs : null;
                                    if(!songs)
                                        continue ;

                                    dbase.collection("hotAlbums").insertOne(element, function(err, result) {
                                        if (err) throw err;
                                    });

                                    for (let index = 0; index < songs.length; index++) {
                                        const element = songs[index];

                                        dbase.collection("song").insertOne(element, function(err, result) {
                                            if (err) throw err;
                                        });

                                        // let res = await axios({
                                        //     method: 'get',
                                        //     url: `http://localhost:3000/song/url?id=${element.id}`, 
                                        // }).catch(e => {
                                        //     console.log(e);
                                        // });

                                        // let data = (res && res.data && res.data.data) ? res.data.data[0] : null;  
                                        // if(data)                  
                                        //     dbase.collection("songs").insertOne(data, function(err, result) {
                                        //         if (err) throw err;
                                        //     });
                                    }
                                }
                            }

                            songoffset +=  songlimit;
                        }
                                        
                    }
                }

                offset += limit;
            }
        }
    
        console.log("mission is finish");
    })();
});