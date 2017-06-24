var express    = require('express');        
var app        = express();                 
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ipaddr = require('ip');
var ip = ipaddr.address();

var Beer = require('./models/beer')
var port = process.env.PORT || 8000;        
mongoose.connect('mongodb://localhost:27017/beerlocker');
var router = express.Router();


app.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

var beersRoute = router.route('/beers');
beersRoute.post(function(req, res) {
   var beer = new Beer();
   beer.name = req.body.name;
   beer.last = req.body.last;
   beer.type = req.body.type;
   beer.quantity = req.body.quantity;
   
   beer.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Beer added to the locker!', data: beer });
  });
});

beersRoute.get(function(req, res) {
   Beer.find(function(err, beers) {
    if (err)
      res.send(err);

    res.json(beers);
  });
});

var beerRoute = router.route('/beers/:beer_id');

beerRoute.get(function(req, res) {
   Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    res.json(beer);
  });
});

beerRoute.put(function(req, res) {
   Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    beer.quantity = req.body.quantity;
    beer.save(function(err) {
      if (err)
        res.send(err);

      res.json(beer);
    });
  });
});


beerRoute.delete(function(req, res) {
   
    Beer.findByIdAndRemove(req.params.beer_id, function(err) {
      if (err)
      res.send(err);

    res.json({ message: 'Beer removed from the locker!' });
  });
});

   
app.use('/api', router);

app.listen(8000, ip);
console.log('Magic happens on port ' + port+' '+ ip);
