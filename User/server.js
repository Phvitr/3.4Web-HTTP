const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer(function(req, res){
    if (req.method === 'GET') {
        fs.readFile(`./Views/register.html`, function(err,data){
            // res.writeHead(200, {`Content-Type`: 'text/html'});
            res.write(data);
            return res.end();
        })
    }else {

    }
})