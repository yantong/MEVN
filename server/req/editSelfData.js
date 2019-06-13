const Busboy = require('busboy');
const mongo = require('mongodb');
var http = require("http");
inspect = require('util').inspect;

module.exports = (app,db) => {
    app.post('/editSelfData',(req,res) =>{   
        let busboy = new Busboy({ headers : req.headers });
        let dbase = db.db("MEVN");
        var bucket = new mongo.GridFSBucket(dbase);
        
        req.pipe(busboy); 

        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            if(req.cookies.account && fieldname == 'name')
            {
                var whereStr = {"account": req.cookies.account};  // 查询条件
                var updateStr = {$set: { "name" : val,"headPic" : '/headPic/' + req.cookies.account}};

                dbase.collection("users").updateOne(whereStr, updateStr, function(err, result) {
                    if (err) throw err;
                });
            }
        });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            if(req.cookies.account)
            {
                dbase.collection("fs.files").find({filename:req.cookies.account + 'headPic'}).toArray(function(err, result) {
                    async function delSameFile(result) {                        
                        for (let index = 0; index < result.length; index++) {
                            const element = result[index];
                            let res = await dbase.collection("fs.files").findOneAndDelete({_id: element._id});
                            let datas = await dbase.collection("fs.chunks").find({files_id: element._id});
                            let chunks = await datas.toArray();

                            for (let i = 0; i < chunks.length; i++) {
                                let res = await dbase.collection("fs.chunks").findOneAndDelete({_id: chunks[i]._id});
                            }
                        }

                        file.pipe(bucket.openUploadStream(req.cookies.account + 'headPic'));
                        file.on('end', function () {});
                    } 

                    delSameFile(result);                    
                });
            }
        });
        busboy.on('finish', function() {
            res.end(JSON.stringify({
                success: true,
            })); 
        });        
    });

    app.get('/headPic/:account',(req,res) =>{   
        let dbase = db.db("MEVN");
        var bucket = new mongo.GridFSBucket(dbase);
        let picName = req.params.account + 'headPic';

        dbase.collection("fs.files").find({filename:req.cookies.account + 'headPic'}).toArray(function(err, result) {
            if(err)
                throw err;
            
            if(result.length > 0)
                bucket.openDownloadStreamByName(picName)
                .pipe(res);
            else
            {
                var url = "http://p2.music.126.net/0tMp6L2i-drWqT8M6e0vsw==/109951164143633531.jpg?param=180y180";
                http.get(url, function(imgRes){
                    imgRes.pipe(res);
                });
            }
        });        
    });

    app.get('/selfData',(req,res) =>{   
        let dbase = db.db("MEVN");

        dbase.collection("users").find({account: req.cookies.account}).toArray(function(err, result) {
            if(result.length > 0) {
                res.end(JSON.stringify({
                    success: true,
                    headPic: result[0].headPic,
                    name: result[0].name
                })); 
            }
            else
            {
                res.end(JSON.stringify({
                    success: false,
                    msg: "账号不存在"
                }));
            }
        });
      
    });
}