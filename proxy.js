var http = require('http');
var httpProxy = require('http-proxy');
var express  = require('express');
var app = express();
var uuidv1 = require('uuid/v1');
var bodyParser = require('body-parser');
var token = "";
var tokens = [];

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({
    target: {
        protocol: 'http',
        host: 'localhost',
        port: 8085
    },
    secure: false
});

proxy.on('proxyRes', function (proxyRes, req, res, options) {

});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
    proxyReq.setHeader("token", token);
});


// LOGIN endpoint
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


app.post('/login', function(req, res) {
    token = uuidv1();
    tokens.push(token);
    var user_id = req.body.user;
    var password = req.body.password;

    console.log(tokens);

    res.send(user_id + ' ' + token + ' ' + password);
});

http.createServer(function (req, res) {
    proxy.web(req, res, {});
}).listen(9000);
app.listen(3000);

console.log('Server ready port 9000');