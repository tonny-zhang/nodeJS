var zlib = require('zlib');

//var input = '.................................';
//zlib.deflate(input, function(err, buffer) {
//  if (!err) {
//    console.log(buffer.toString('base64'));
//  }
//});
//
//var buffer = new Buffer('eJzT0yMAAGTvBe8=', 'base64');
//zlib.unzip(buffer, function(err, buffer) {
//  if (!err) {
//    console.log(buffer.toString());
//  }
//});


////----抓包----
//var http = require('http');
//var fs = require('fs');
//var request = http.get({ host: 'misc.fandongxi.com',
//                         path: '/min/f=/js/modules/login.js?20130105_151420',
//                         port: 80,
//                         headers: { 'accept-encoding': 'gzip,deflate' } });
//request.on('response', function(response) {
//  var output = fs.createWriteStream('fandongxi.com.index.html');
//console.log(response.headers);
//  switch (response.headers['content-encoding']) {
//    // or, just use zlib.createUnzip() to handle both cases
//    case 'gzip':
//      response.pipe(zlib.createGunzip()).pipe(output);
//      break;
//    case 'deflate':
//      response.pipe(zlib.createInflate()).pipe(output);
//      break;
//    default:
//      response.pipe(output);
//      break;
//  }
//});

var gzip = zlib.createGzip();
var fs = require('fs');
var inp = fs.createReadStream('file.js');
var out = fs.createWriteStream('file_gzip.js');

inp.pipe(gzip).pipe(out);