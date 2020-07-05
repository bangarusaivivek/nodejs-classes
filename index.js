const http = require('http');

const reqListener = (req,res)=>{
    console.log('Hello node')
    res.write('Hello node')
    res.end()
}
const server = http.createServer(reqListener);
server.listen(4000);