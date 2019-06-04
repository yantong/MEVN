module.exports = (app,db) => {
    app.post('/regest',(req,res) =>{
        var dbase = db.db("MEVN");

        dbase.collection("users").find({account:req.body.account}).toArray(function(err, result) {
            if (err) throw err;

            if(result.length == 0)
            {
                dbase.collection("users").insertOne({account:req.body.account,pass:req.body.pass}, function(err, result) {
                    if (err) throw err;

                    res.set('Content-Type','text/plain');
                    res.end(JSON.stringify({
                        success: true,
                        msg:'账号创建成功'
                    }));
                });
            }
            else
            {
                res.set('Content-Type','text/plain');
                res.end(JSON.stringify({
                    success: false,
                    msg:'账号已存在'
                })); 
            }            
        });
    });
}