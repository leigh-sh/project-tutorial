var restify = require('restify');
var redis = require('redis');
var fs = require('fs');
var client = redis.createClient();
var server = restify.createServer();

client.on('error', function(err) {
    console.log('error ' + err);
});

function getHello(req, res, next){
    client.get('hello', function(err, reply){ 
        console.log(reply);
    });
}

function insertToRedis(req, response, next) {
    client.get('hello', function(err, res){ 
        console.log(res);
    if (res) {    
      client.incr('hello');  
      response.send(200);
    }
    else {
        response.status(404);
        response.send('error');
    }
    
});
}
server.get('/hello', insertToRedis);

server.listen(8000, function() {
    console.log('listening at %s', server.url);
});
