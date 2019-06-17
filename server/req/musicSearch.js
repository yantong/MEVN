module.exports = (app,db) => {

    app.post('/searchSingleMusic',(req,res) => {
        var dbase = db.db("MEVN");

        dbase.collection("song").find({name:{ $regex: `${req.body.musicName}+`, $options: 'i'}})
        .project({ name: 1, id: 1, ar: 1, _id: 0 })
        .limit(100)
        .toArray(function(err, result) {
            if (err) throw err;
        
            if(result.length != 0)
            {
                res.set('Content-Type','text/plain');
                res.end(JSON.stringify({
                    success: true,
                    music:result
                }));
            }
        });
    });
}
