var restify = require('restify');
var redis = require('redis');
var fs = require('fs');
var client = redis.createClient();
var server = restify.createServer();

client.on('error', function (err) {
    console.log('Error ' + err);
});

server.get('/hello', function(req, res, next){
    fs.writeFile("/tmp/log", "test", function(err) {
    if(err) {
        return console.log(err);
    }
    client.incr('hello');
   
    client.get('hello', function(err, reply){ console.log(reply);});
    res.send({ success: true, session: req.session });
    return next();
});
});

server.listen(8000, function() {
console.log('listening at %s', server.url);
});
