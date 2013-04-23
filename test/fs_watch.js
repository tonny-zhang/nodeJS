var fs = require('fs');

fs.watch('e:/nodejsSite/express-site',function(event,filename){
	console.log(event,filename);
});
console.log('watching...');