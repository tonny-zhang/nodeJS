var fs = require('fs'),
	path = require('path'),
	http = require('http');

//fs.readdirSync();
var str = 'http://s.click.taobao.com/t_8?e=7HZ6jHSTbIWfoY1gP3p7kJWgrqHd4xQWcyH%2BWiooRxYzQdQ5v0OBAe2TKGaH%2BMRXzFZ8Tr5p9JqLW3i4ppoB8qnD9d11hQPfm2gdWrr2ZfmiJCw%3D&p=mm_17142583_0_0&n=19&ref=';
str = '/t_8?e=7HZ6jHSTbIWfoY1gP3p7kJWgrqHd4xQWcyH%2BWiooRxYzQdQ5v0OBAe2TKGaH%2BMRXzFZ8Tr5p9JqLW3i4ppoB8qnD9d11hQPfm2gdWrr2ZfmiJCw%3D&p=mm_17142583_0_0&n=19&ref=';
str = '/t_js?tu=http%3A%2F%2Fs.click.taobao.com%2Ft_8%3Fe%3D7HZ6jHSTbIWfoY1gP3p7kJWgrqHd4xQWcyH%252BWiooRxYzQdQ5v0OBAe2TKGaH%252BMRXzFZ8Tr5p9JqLW3i4ppoB8qnD9d11hQPfm2gdWrr2ZfmiJCw%253D%26p%3Dmm_17142583_0_0%26n%3D19%26ref%3D';
var host = 'a.fandongxi.com';
str = '/__redirect/type=shop-sale;type2=item/http://www.fandongxi.com/shop/sale/redirect.fan?id=2589';
host = 'www.fandongxi.com';
str = '/shop/sale/redirect.fan?id=2589';
host = 'p.yiqifa.com';
str = '/c?s=1aa81bfa&w=148442&c=5331&i=11202&l=0&e=&t=http://promotion.yintai.com/20120416/JackJones/index.html?intcmp=20120418_yx_home_a_1_huodong-1';
host = 'cps.yintai.com';
str = '/Websource.aspx?source=adminyiqifawangzhizhan&thkey=MTQ4NDQyfA==&url=http://promotion.yintai.com/20120416/JackJones/index.html?intcmp=20120418_yx_home_a_1_huodong-1';


host = 's.click.taobao.com';
str = '/t_js?tu=http%3A%2F%2Fs.click.taobao.com%2Ft_8%3Fe%3D7HZ6jHSTbIWfoY1gP3p7kJWgrqHd4xQWcyH%252BWiooRxYzQdQ5v0OBAe2TKGaH%252BMRXzFZ8Tr5p9JqLW3i4ppoB8qnD9d11hQPfm2gdWrr2ZfmiJCw%253D%26p%3Dmm_17142583_0_0%26n%3D19%26ref%3D';

host = 's.click.taobao.com';
str = '/t_8?e=7HZ6jHSTbIWfoY1gP3p7kJWgrqHd4xQWcyH%2BWiooRxYzQdQ5v0OBAe2TKGaH%2BMRXzFZ8Tr5p9JqLW3i4ppoB8qnD9d11hQPfm2gdWrr2ZfmiJCw%3D&p=mm_17142583_0_0&n=19&ref= ';

//host = 's.click.taobao.com';
//str = '/t_js?tu=http%3A%2F%2Fs.click.taobao.com%2Ft_8%3Fe%3D7HZ6jHSTbIWfoY1gP3p7kJWgrqHd4xQWcyH%252BWiooRxYzQdQ5v0OBAe2TKGaH%252BMRXzFZ8Tr5p9JqLW3i4ppoB8qnD9d11hQPfm2gdWrr2ZfmiJCw%253D%26p%3Dmm_17142583_0_0%26n%3D19%26ref%3D%26ref%3D';
//var client = http.createClient(80, host);

/*var request = client.request('GET',str,{
	'Referer':'http://s.click.taobao.com/t_js?tu=http%3A%2F%2Fs.click.taobao.com%2Ft_8%3Fe%3D7HZ6jHSTbIWfoY1gP3p7kJWgrqHd4xQWcyH%252BWiooRxYzQdQ5v0OBAe2TKGaH%252BMRXzFZ8Tr5p9JqLW3i4ppoB8qnD9d11hQPfm2gdWrr2ZfmiJCw%253D%26p%3Dmm_17142583_0_0%26n%3D19%26ref%3D%26ref%3D'});
*/
var client = http.createClient(80,'misc.fan.com');
var request = client.request('GET','/min/f=js/global.js');
request.end();
request.on('response', function (response) {
	console.log(response.bytesRead);
	console.log(response);
  console.log('STATUS: ' + response.statusCode);
  console.log('HEADERS: ' + JSON.stringify(response.headers));
  fs.writeFileSync('d:response.txt',response+'\n\r'+'STATUS: ' + response.statusCode+'\n\r location:'+response.headers.location);
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
	
	fs.writeFileSync('d:responseBody.txt', chunk, 'utf8',function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
  });
});
