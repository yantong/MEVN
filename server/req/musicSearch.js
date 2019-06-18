module.exports = (app,db) => {

    app.post('/searchSingleMusic',(req,res) => {
        var dbase = db.db("MEVN");

        let cursor = dbase.collection("song").find({$or: [
            {name: { $regex: `${req.body.musicName}+`, $options: 'i'}},
            {'ar.0.name': { $regex: `${req.body.musicName}+`, $options: 'i'}}
        ]});
        cursor.count(function(err, count) {
            if (err) throw err;
            
            cursor.project({ name: 1, id: 1, ar: 1, _id: 0 })
            .skip((req.body.page - 1) * req.body.size)
            .limit(parseInt(req.body.size))
            .toArray(function(err, result) {
                if (err) throw err;
            
                // if(result.length != 0)
                {
                    res.set('Content-Type','text/plain');
                    res.end(JSON.stringify({
                        success: true,
                        music:result,
                        count: count
                    }));
                }
            });
        });
    });

    app.post('/searchSonger',(req,res) => {
        var dbase = db.db("MEVN");

        dbase.collection("songer").find({name:{ $regex: `${req.body.musicName}+`, $options: 'i'}})
        .project({ name: 1, id: 1, picUrl: 1, _id: 0 })
        .limit(100)
        .toArray(function(err, result) {
            if (err) throw err;
        
            // if(result.length != 0)
            {
                res.set('Content-Type','text/plain');
                res.end(JSON.stringify({
                    success: true,
                    music:result
                }));
            }
        });
    });

    app.post('/searchSongerAlbum',(req,res) => {
        var dbase = db.db("MEVN");

        dbase.collection("hotAlbums").find({'artists.0.name': { $regex: `^${req.body.songer}$`, $options: 'i'}})
        .project({ name: 1, id: 1, picUrl: 1,artists: 1, _id: 0 })
        .limit(100)
        .toArray(function(err, result) {
            if (err) throw err;

            res.set('Content-Type','text/plain');
            res.end(JSON.stringify({
                success: true,
                music:result
            }));
        });
    });

    app.post('/searchAlbum',(req,res) => {
        var dbase = db.db("MEVN");

        dbase.collection("hotAlbums").find({$or: [
            {name:{ $regex: `${req.body.musicName}+`, $options: 'i'}},
            {'artists.0.name': { $regex: `${req.body.musicName}+`, $options: 'i'}}
        ]})
        .project({ name: 1, id: 1, picUrl: 1,artists: 1, _id: 0 })
        .limit(100)
        .toArray(function(err, result) {
            if (err) throw err;
        
            // if(result.length != 0)
            {
                res.set('Content-Type','text/plain');
                res.end(JSON.stringify({
                    success: true,
                    music:result
                }));
            }
        });
    });

    app.post('/searchAlbumMusic',(req,res) => {
        var dbase = db.db("MEVN");

        let cursor = dbase.collection("song").find({'al.name' : { $regex: `^${req.body.albumName}$`, $options: 'i'}});
        cursor.count(function(err, count) {
            if (err) throw err;
            
            cursor.project({ name: 1, id: 1, ar: 1, _id: 0 })
            .skip((req.body.page - 1) * req.body.size)
            .limit(parseInt(req.body.size))
            .toArray(function(err, result) {
                if (err) throw err;
            
                res.set('Content-Type','text/plain');
                res.end(JSON.stringify({
                    success: true,
                    music:result,
                    count: count
                }));
            });
        });
    });
}
