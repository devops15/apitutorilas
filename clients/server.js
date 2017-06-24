var express    = require('express');        
var app        = express();                 
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ipaddr = require('ip');
var ip = ipaddr.address();

var User = require('./models/user')
var port = process.env.PORT || 8000;        
mongoose.connect('mongodb://localhost:27017/clients');
var router = express.Router();


app.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res) {
  res.json({ message: 'You are running dangerously low on beer!' });
});

var usersRoute = router.route('/users');
usersRoute.post(function(req, res) {
   var user = new User();
   user.first = req.body.first;
   user.last = req.body.last;
   user.gender = req.body.gender;
   user.hair_colour = req.body.hair_colour;
   user.occupation = req.body.occupation;
   user.nationality = req.body.nationality;
   
   user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User added to the locker!', data: user});
  });
});

   
app.use('/api', router);

app.listen(8000, ip);
console.log('Magic happens on port ' + port+' '+ ip);
