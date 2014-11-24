var express = require('express'),
    app = express(),
    bodyParser  = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose');

Schema   = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


mongoose.connect('mongodb://heroku_app31909392:6768oilqcc3s0glbr839rbkbep@ds053310.mongolab.com:53310/heroku_app31909392');

var schemaMessage = new Schema({
    name:    {type: String, trim: true},
    email:  {type: String, trim: true},
    message:  String
},{ versionKey: false })

var Message = mongoose.model('Message', schemaMessage);

app.route('/messages')
    .post(function(req, res) {
        var message = new Message({
            name:    req.body.name,
            email: 	  req.body.email,
            message:  req.body.message
        });

        message.save(function(err) {
            if(err) return res.send(500);
            res.status(200).jsonp('Su mensaje ha sido enviado de forma correcta');
        });
    });




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

});