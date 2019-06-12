const Busboy = require('busboy');
const mongo = require('mongodb')
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
                var updateStr = {$set: { "name" : inspect(val)}};

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

                            console.log(chunks);
                            for (let i = 0; i < chunks.length; i++) {
                                let res = await dbase.collection("fs.chunks").findOneAndDelete({_id: chunks[i]._id});
                                console.log(res);
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

        bucket.openDownloadStreamByName(picName)
        .pipe(res);
    });
}