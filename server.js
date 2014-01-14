var restify = require('restify'),
    port = process.env.PORT || 5000;

function respond(req, res, next) {
  res.contentType = 'application/json';
  res.send({ code: 200, message: 'hello ' + req.params.name });
  res.end();
}

var server = restify.createServer();

server.get('/hello/:name', respond);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);

  // send message to parent process that server is running;
  // useful for running server as child process during tests:
  if (process.send) process.send('online');
});
