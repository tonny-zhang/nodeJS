var css = require("stylus"),
    fs = require("fs");

var fileName = "./src/index.styl",
	charset = "utf8";
//fileName = './tests/1.styl';

css.render(fs.readFileSync(fileName,charset ), { filename: fileName }, function(err, css) {
    if (err) throw err;
    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(css);
    }).listen(1337, '127.0.0.1');
    console.log('已经启动 http://127.0.0.1:1337/');
});