const http = require('http');

const ejs = require("ejs");

const app = http.createServer((req,res) => {
    if(req.url == "/"){
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        // ejs模板编译
        ejs.renderFile("./views/index.ejs",{
            title:"why"
        },(err,data)  =>{
            if(err){
                console.log(err)
                return;
            }
            console.log(data)
            res.end(data)
        })
    }
})


app.listen(3000,() => {
    console.log('server start at 3000 port');
})