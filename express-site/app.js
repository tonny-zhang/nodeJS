
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EXT = require('./config/Global.json').ext;
var fs = require('fs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:'./upload_temp'}));
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ key: 'SESSIONID',secret: "keyboard cat" }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
app.engine('.html',function(path,options,fn){
  fs.readFile(path,function(err,data){
    fn(err,data.toString());
  });
});
app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * 用一个方法设置整个路由规则 (/*.node的都走这个规则)
 * 
 *   /test.node -> require('./routes/test').index
 *   /test.hello.node -> require('./routes/test').hello
 *   / -> require('./routes/index').index;
 *   /tests -> require('./routes/tests/index').index
 * 
 * @type {[type]}
 */
var ROUTES_PATH = __dirname + '/routes/';
app.all(['/','/[^.]+','/*'+EXT],function(req,res,next){
  var method = req.route.method;
  var reqParam = req.route.params;
  var path = reqParam?reqParam[0].replace(EXT,''):'/';
  path += ~path.lastIndexOf('.')?'':'.index';
  var pathArr = path.split('.')
  var requirePath = pathArr[0];
  var requestMethod = pathArr[1];
  var route = require(ROUTES_PATH+requirePath);
  route && route[method] && route[method][requestMethod] && (console.log(ROUTES_PATH+requirePath,method,requestMethod),route[method][requestMethod](req,res,next));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
