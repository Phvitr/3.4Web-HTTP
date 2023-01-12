const http = require('http');
const fs = require('fs');
const qs = require('qs');


const server = http.createServer((req,res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/display.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    }else {
        let data = ``;
        req.on(`data`, chunk => {
            data += chunk;
        })
        req.on(`end`, () => {
            let result = 0;
            const calculatorData = qs.parse(data);
            switch (calculatorData.selection) {
                case '+':
                    result = +calculatorData.parameter1 + +calculatorData.parameter2;
                    break;
                case '-':
                    result = +calculatorData.parameter1 - +calculatorData.parameter2;
                    break;
                case '*':
                    result = +calculatorData.parameter1 * +calculatorData.parameter2;
                    break;
                case '/':
                    result = +calculatorData.parameter1 / +calculatorData.parameter2;
                    break;
            }
            fs.readFile('./views/calculator.html', "utf-8", (err, dataResult) => {
                if (err) {
                    console.log(err)
                }
                dataResult = dataResult.replace('{result}',result);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dataResult);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log(`error`)
        })
    }
});

server.listen(8003, () => {
    console.log(`server running at localhost:8003`)
});
