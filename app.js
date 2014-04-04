
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var swig = require('swig');

var app = express();
var Order = require('./models')["Order"];

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/purchaseForm', function(req, res){
	 var orderDetails = res.req.body;
	 console.log(orderDetails);
Order.findOneAndUpdate({name: orderDetails.name[0] },
	{billName: orderDetails.name[1],
  state: orderDetails.state,
  street: orderDetails.street,
  ac: orderDetails.ac,
  shipping: orderDetails.shipping,
  cardNum: '4214552312233244',
  csc: orderDetails.csc,
  month: orderDetails.month,
  year: orderDetails.year,
  cardType: 'visa'},
					  {upsert: true},
					  function(err,res){
					  	if(err){console.log(err.message)}
					  	else{console.log("Order Updated: "+orderDetails.name[0]);
					  res.redirect('/history');
					}
					  });

	});
app.get('/purchaseForm', function(req, res){
  res.render("purchaseForm");
});
app.get('/users', user.list);
app.get('/history', function(req, res){
	Order.findOne({}, function(err, school){
		orderItem = school;
		console.log(orderItem);
  res.render("history",{purchases: orderItem});})
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
