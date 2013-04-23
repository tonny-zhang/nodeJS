
/*
 * GET home page.
 */

exports.get = {
	index: function(req, res){
	  res.render('index', { title: 'Express' });
	}
}