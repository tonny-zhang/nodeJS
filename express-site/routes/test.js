var upload = require('utils/upload');
exports.get = {
	index: function(req,res){
		res.send('test index');
	}
	, hello: function(req,res){
		res.send('hello world');
	}
	, upload: function(req,res){
		res.render('tests/upload',{
			title: 'test upload',
			ext: require('../config/Global.json').ext
		});
	}
	, prettify: function(req,res){
		res.render('tests/prettify.html');
	}
}
exports.post = {
	upload: upload.uploadToPublic
}