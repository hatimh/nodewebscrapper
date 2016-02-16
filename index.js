var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = 'http://substack.net/images/';
request(url, function(error, response, html){
  if(!error){
    var $ = cheerio.load(html);
    var arr = $('tr').filter(function(index,elem){
      return $(this).children().children().prevObject[1].children[0].children[0] != undefined;
    }).toArray();
    arr.forEach(function(elem){
      var permission = elem.children[0].children[0].children[0].data;
      var absLink = 'http://substack.net' + elem.children[2].children[0].attribs.href;
      var type = absLink.slice(-3);
      fs.appendFile('images.csv', permission + "," + absLink + "," + type + '\n', function(err) {
        if (err) {
          throw err;
        };
      });      
    });
  };
});
