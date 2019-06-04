module.exports = (app,db) => {
    app.post('/regest',(req,res) =>{
        res.end('get the post');     
    });
}