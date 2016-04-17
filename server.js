var restify = require('restify');
var redis = require('redis');
var client = redis.createClient();
var server = restify.createServer();

server.get('/hello', function(req, res, next){
    res.send({ success: true, session: req.session });
    return next();
});

server.listen(8000, function() {
console.log('listening at %s', server.url);
});
