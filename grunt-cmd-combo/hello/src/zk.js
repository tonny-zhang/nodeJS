/*
 * zk
 * https://github.com/tonny-zhang/nodeJS
 *
 * Copyright (c) 2012 tonny
 * Licensed under the MIT license.
 *
//test/
/*abc*/
(function($) {

  // Collection method.
  $.fn.awesome = function() {
    return this.each(function() {
      $(this).html('awesome');
    });
  };

  // Static method.
  $.awesome = function() {
    return 'awesome';
  };

  // Custom selector.
  $.expr[':'].awesome = function(elem) {
    return elem.textContent.indexOf('awesome') >= 0;
  };

}(jQuery));
