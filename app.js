var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess;

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));

router.use(express.urlencoded({extended: true}));
router.use(express.json());// Function to read in XML file and convert it to JSON
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

        console.log(obj);

        xmlFileToJs('structure.xml', function(err, result){
            if(err) throw (err);

                result.item.element.push({'Channel': obj.Channel, 'PublishedDate': obj.PublishedDate, 'Title': obj.Title, 'URL': obj.URL});

                console.log(result);

                jsToXmlFile('structure.xml', result, function(err){
                    if(err) console.log(err);
                })
            
        })
    }
    appendJSON(req.body);

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

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});