const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/0923", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Schema = mongoose.Schema;
const citySchema = new Schema({
  name: String,
  index: String
});
const City = mongoose.model("City", citySchema, "city");
const city = new City({
  name: "beijing",
  index: "1"
});
/* city.save().then(mon => {
  console.log(mon);
});
 */
module.exports = City;
