var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    xmlParse = require('xslt-processor').xmlParse,
    expAutoSan = require('express-autosanitizer'),
    xsltProcess = require('xslt-processor').xsltProcess;

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(express.urlencoded({extended: true}));
router.use(express.json());// Function to read in XML file and convert it to JSON
router.use(expAutoSan.allUnsafe);

function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}

router.post('/post/json', function(req, res){

    function appendJSON(obj){

       // console.log(obj);

        xmlFileToJs('structure.xml', function(err, result){
            if(err) throw (err);

                result.item.element.push({'Channel': obj.Channel, 'PublishedDate': obj.PublishedDate, 'Title': obj.Title, 'URL': obj.URL});

               // console.log(result);

                jsToXmlFile('structure.xml', result, function(err){
                    if(err) console.log(err);
                })
            
        })
    }
    appendJSON(req.body);

    res.redirect('back');
});

router.post('/post/delete', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function deleteJSON(obj) {
    // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
    xmlFileToJs('structure.xml', function(err, result) {
      if (err) throw (err);
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      delete result.item.element[obj.element];
      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('structure.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);

  res.redirect('back');

});
router.post('/post/edit', function(req, res) {

  
  function editJSON(obj) {
    
    // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
    xmlFileToJs('structure.xml', function(err, result) {
      if (err) throw (err);
      
     result.item.element[obj.element] = {'Channel': obj.Channel, 'PublishedDate': obj.PublishedDate, 'Title': obj.Title, 'URL': obj.URL}; 
      //Converting back to our original XML file from JSON
      jsToXmlFile('structure.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  };

  
  editJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

router.get('/', function(req, res){

    res.render('index');

})

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('structure.xml', 'utf8');
    var xsl = fs.readFileSync('playlist.xsl', 'utf8');
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet);

    res.end(result.toString());


});

server.listen(process.env.PORT || 3001, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});