var restify = require('restify'),
    test = require('tap').test,
    fork = require('child_process').fork,
    port = 5000,
    child;

test('setup', function (t) {
  t.plan(1);
  child = fork(__dirname + '/../server.js', [], {env: {PORT: port}});
  child.on('message', function(msg) {
    if (msg === 'online') {
      t.ok(true, 'Server is online');
    }
  });
});

var client = restify.createJsonClient({
  version: '*',
  url: 'http://127.0.0.1:' + port
});

test('200 response on "hello/:name"', function (t) {
  t.plan(1);

  client.get('/hello/world', function(err, req, response, data) {
    if (err) throw new Error(err);

    t.equal(response.statusCode, 200, "its response code should equal 200");
  });
});

test('teardown', function (t) {
  child.kill();
  t.end();
});
