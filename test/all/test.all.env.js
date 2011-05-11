var assert = require('assert')
  , jellyfish = require('jellyfish');

var done = [];

var test = function(b) {
  b.go("http://www.wikipedia.com")
    .js("document.title", function(o) {
      assert.equal(o.result,"Wikipedia")
    })
    .js("document.getElementById(\'searchInput\').value = \'test\'")
    .js("document.getElementById(\'searchInput\').value")
    .js("document.getElementsByName(\'go\')[0].click()")
    .jsfile("../example_file.js", function(o) {
      b.stop();
    })
};

var browsers = [];
browsers.push(jellyfish.createFirefox());
browsers.push(jellyfish.createChrome());
browsers.push(jellyfish.createSafari());
browsers.push(jellyfish.createSauce());
browsers.push(jellyfish.createWebdriver());
browsers.push(jellyfish.createZombie());

browsers.forEach(function(o) {
  o.on('result', function(res) {
    console.log(o.name + ' : '+o.tid + ' - \x1b[33m%s\x1b[0m', JSON.stringify(res));
  });

  test(o);
});