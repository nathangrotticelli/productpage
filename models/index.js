var mongoose = require('mongoose');

if(process.env.NODE_ENV === "production") {
	mongoose.connect(process.env.MONGOLAB_URI);
} else {
  mongoose.connect('mongodb://localhost/productLP');
}
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  name: String,
  billName: String,
  state: String,
  street: String,
  ac: Number,
  shipping: String,
  cardNum: Number,
  csc: Number,
  month: Number,
  year: Number,
  cardType: String
});




var Order = mongoose.model('Order', orderSchema);


module.exports = {
  Order: Order
}
