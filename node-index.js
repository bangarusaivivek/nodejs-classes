const http = require('http');
const fs = require('fs');

const reqListener = (req,res)=>{
    const {url,method} = req;
    res.setHeader('Content-Type','text/html')
    
    if (url === '/' ){
        res.write(`
            <html>
                <head><title>Learn Nodejs</title>
                    <link rel="icon" href="data:," />
                </head>
                <body>
                    <h1>I am Main page!</h1>
                    <form action="/message" method="POST">
                        <input type="text" placeholder="Add your message" name="message" />
                    </form>
                </body>
            </html>
        `)
        return res.end();
    }

    if (url === '/message' && method === 'POST'){
        const body = [];

        req.on('data',(chunk)=>{
            // console.log(chunk)
            body.push(chunk);
        })
        
        // console.log(body)
        console.log(url)
        return req.on('end',()=>{
            // console.log('inside')
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody)
            const message = parsedBody.split("=")[1];

            fs.writeFile('message.txt',message,(err)=>{
                if(err){
                    res.send(err);
                }

                res.statusCode = 302;
                // setTimeout(()=>{
                //     res.setHeader("Location","/")
                //     return res.end();
                // },1000)
                res.setHeader("Location","/")
                console.log(url)
                return res.end(); 
            })
            
            // res.write(`
            //     <html>
            //         <head><title>Learn Nodejs</title></head>
            //         <body>
            //             <h1>Message Received</h1>
            //         </body>
            //     </html>
            // `)
            // console.log("hello")
            // return res.end();
        });
        
    }

    res.write(`
        <html>
            <head><title>Learn Nodejs</title></head>
            <body>
                <h1>404: Not Found</h1>
            </body>
        </html>
    `)
    res.end();
}
const server = http.createServer(reqListener);
server.listen(3000);