$.fn.isRendered = function() {
  return this.length > 0;
};

/*Defer = (function(cb) {
  setTimeout(cb, 100);
});*/

Function.prototype.defer = (function(delay) {
  delay = delay || 100;
 setTimeout(this, delay);
});

