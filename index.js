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
//mongoose.connect('mongodb://localhost:27017/dc');

var schemaMessage = new Schema({
    name:    {type: String, trim: true},
    email:  {type: String, trim: true},
    message:  String
},{ versionKey: false });

var schemaSubscriber = new Schema({
    subscriber:    {type: String, trim: true}
},{ versionKey: false });

var Message = mongoose.model('Message', schemaMessage);
var Subscriber = mongoose.model('Subscriber', schemaSubscriber);

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

app.route('/subscribers')
    .post(function(req, res) {

        var subscriber = new Subscriber({
            subscriber: req.body.subscriber
        });

        subscriber.save(function(err) {
            if(err) return res.send(500);
            res.status(200).jsonp('Su ha suscrito a nuestra lista');
        });
    });




app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.render('index.html')
});

var port = process.env.PORT || 3000;


var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Cheka http://%s:%s', host, port)

});