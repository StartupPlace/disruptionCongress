var express = require('express')
var app = express()


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.render('index.html')
});

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Cheka http://%s:%s', host, port)

})