var http = require('http');
var fs = require('fs');
const { type } = require('os');

const server = http.createServer(function(req, res){
    if(req.url === '/'){
        res.writeHead(200, {'Content-type':'text/html'})
        fs.createReadStream('index.html').pipe(res);
    }
    else if(req.url === '/server' && req.method === 'POST'){
        var recData = '';
        req.on('data', function(value){
            recData += value;
        })
        req.on('end', function(){
            var inputdata = new URLSearchParams(recData);
            var skills = " ";
            if(inputdata.get('skills1'))
            {
                skills+=" "+inputdata.get('skills1')
            }
            if(inputdata.get('skills2'))
            {
                skills+=" "+ inputdata.get('skills2')
            }
            if(inputdata.get('skills3'))
            {
                skills+=" "+ inputdata.get('skills3')
            }
            if(inputdata.get('skills4'))
            {
                skills+=" "+ inputdata.get('skills4')
            }
            res.writeHead(200, {'Content-type':'text/html'})
            res.write("<table border=1 cellspacing=0><tr><th>Field Name</th><th>Value</th></tr>")
            res.write("<tr><td>Name </td><td>" + inputdata.get('username') + "</td></tr>")
            res.write("<td>Password </td><td>" + inputdata.get('password') + "</td></tr>")
            res.write("<td>Age </td><td>" + inputdata.get('age') + "</td></tr>")
            res.write("<td>Mobile Number </td><td>" + inputdata.get('number') + "</td></tr>")
            res.write("<td>Email </td><td>" + inputdata.get('email') + "</td></tr>")
            res.write("<td>Gender </td><td>" + inputdata.get('gender') + "</td></tr>")
            res.write("<td>State </td><td>" + inputdata.get('state') + "</td></tr>")
            res.write("<td>Skills </td><td>" + skills + "</td></tr>")
            res.write("</table>")
            
            res.end();
        })
    }
})

server.listen(5000, function(){
    console.log('Server started at port 5000')
})
