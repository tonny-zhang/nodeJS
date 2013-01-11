var less = require('less');

less.render('.class { width: 1 + 1 }', function (e, css) {
    console.log(css);
});

var parser = new(less.Parser);

parser.parse('.class { width: 1+10px }', function (err, tree) {
    if (err) { return console.error(err) }
    console.log(tree.toCSS());
});

parser = new(less.Parser)({
    paths: ['.', './lib'], // Specify search paths for @import directives
    filename: 'reset.less' // Specify a filename, for better error messages
});

parser.parse('.class { width: 1 + 1 }@aa: "color";@bb: "aa";.test {	@@bb : red;}', function (e, tree) {
    var css = tree.toCSS({ compress: true }); // Minify CSS output
	console.log(css);
	//console.log(tree);
});