var pg = require('pg');

var db_url = 'postgres://vqavqhexmghdag:1QKJZ0XaWsoph9ob-z6BcWzCiO@ec2-54-83-201-96.compute-1.amazonaws.com:5432/df2ms04ddmur4l';
db_url = 'tcp://postgres:123@localhost:5432/postgres';
pg.connect(db_url, function(err, client) {
	if(err){
		console.log(err);
		return;
	}
  var query = client.query('SELECT * FROM TEST_COMPANY');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});