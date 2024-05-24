var internalIp    = require('internal-ip');
var getPort       = require('get-port');
var http          = require('http');
var mime          = require('mime');
var debug         = require('debug')('SMFS');
var eventHandler  = new (require("events").EventEmitter)();
var crypto        = require('crypto');
var url           = require('url');
var fs            = require('fs');

var isLoaded = false;
var port = null;
var ip = internalIp();
var server = null;
var _files = [];

var server = http.createServer(function (req, res) {
  debug('Files requested');
  var fileHash = url.parse(req.url).pathname.substring(1);
  var file = _files.filter(function(f){
    return f.hash === fileHash;
  })[0];
  if (file){
    debug('Files found');

    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Length', file.total);
    res.statusCode = 200;

    if (file.headers){
      debug('Add headers');
      for(var i = 0; i < Object.keys(file.headers).length; i++){
        var key = Object.keys(file.headers)[i];
        debug('   ' + key + ': ' + file.headers[key]);
        res.setHeader(key, file.headers[key]);
      }
    }

    return fs.createReadStream(file.path).pipe(res);

  }else{
    debug('File not found');
    res.statusCode = 404;
    res.end();
  }
});

getPort(function(err, _port){
  debug('Port getted');
  port = _port;
  server.listen(port);
  isLoaded = true;
  eventHandler.emit('done');
});

function getHash(){
  debug('Creating hash');
  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  return crypto.createHash('sha1').update(current_date + random).digest('hex');
}

function addFile(file, opts, cb) {
  fs.stat(file, function(err, stat){
    debug('File info getted');
    if (err){
      cb(err);
    }
    if (!stat.isFile()){
      cb(new Error("The path must be a file"));
    }
    var _hash = getHash();
    debug('Saving file data');
    _files.push({
      hash: _hash,
      path: file,
      total: stat.size,
      type: opts.type || mime.lookup(file),
      headers: opts.headers
    });
    debug('Return the file URL');
    cb(undefined, 'http://' + ip + ':' + port + '/' + _hash);
  });
}

module.exports = {
  close: function(){
    if(null !== server){
      debug('Closing socket');
      server.close();
    }
  },
  serve: function(file, opts, cb){
    if (isLoaded){
      debug('The server is already loaded');
      addFile(file, opts, cb);
    }else{
      debug('The server is not ready... wating...');
      eventHandler.on('done', function () {
        debug('The server is ready');
        addFile(file, opts, cb);
      });
    }
  }
};
