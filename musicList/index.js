const axios = require('axios');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;

    let dbase = db.db("MEVN");

    // 5001
    let songerTypes = [1001,1002,1003,2001,2002,2003,6001,6002,6003,7001,7002,7003,4001,4002,4003];
    // let songerTypes = [1001];

    (async function () {
        for (const index in songerTypes) {
            let songerType = songerTypes[index];
            let searchFinish = false;
            let limit = 30;
            let offset = 0;

            //要对error做处理
            
    
            while (!searchFinish) 
            {
                let res = await axios({
                    method: 'get',
                    url: `http://localhost:3000/artist/list?cat=${songerType}&limit=${limit}&offset=${offset}`, 
                })

                let array = res.data.artists;

                if(!array || array.length == 0 || offset > 10)
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
                        let songlimit = 30;
                        let songoffset = 0;

                        while (!songSearchFinish)
                        {
                            let res = await axios({
                                method: 'get',
                                url: `http://localhost:3000/artist/album?id=${element.id}&limit=${songlimit}&offset=${songoffset}`, 
                            })

                            let songsArray = res.data.hotAlbums;

                            if(!songsArray || songsArray.length == 0 || songoffset > 10)
                            {
                                songSearchFinish = true;
                            }

                            if(songsArray) {
                                for (let index = 0; index < songsArray.length; index++) {
                                    const element = songsArray[index];

                                    let res = await axios({
                                        method: 'get',
                                        url: `http://localhost:3000/album?id=${element.id}`, 
                                    })

                                    let songs = res.data.songs;
                                    if(!songs)
                                        continue ;

                                    for (let index = 0; index < songs.length; index++) {
                                        const element = songs[index];

                                        let res = await axios({
                                            method: 'get',
                                            url: `http://localhost:3000/song/url?id=${element.id}`, 
                                        })

                                        let data = res.data.data[0];
                    
                                        dbase.collection("songs").insertOne(data, function(err, result) {
                                            if (err) throw err;
                                        });
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

    // async function getZhuanji(element) {
    // }
});