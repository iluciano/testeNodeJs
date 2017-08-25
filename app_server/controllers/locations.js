/* GET home page*/
module.exports.homelist = function(req, res){
    res.render('location-list', {title: 'Loc8r'});  
  };

/* GET Informações de localização*/
module.exports.locationInfo = function(req, res){
    res.render('index', {title: 'Localização'});  
  };

  /* GET Review*/
module.exports.addReview = function(req, res){
    res.render('index', {title: 'Review'});  
  };