var crypto = require('crypto');
var params = {
	nonce: 'test',
	timestamp: 1362729916734
}
var sha1Str = [params.nonce,params.timestamp,'tonnyzhang'].sort().join('');//'1362729916734testtonnyzhang';//
var signature = crypto.createHash('sha1').update(sha1Str).digest('hex');
console.log(sha1Str,signature);