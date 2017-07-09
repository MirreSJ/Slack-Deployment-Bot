var config = require('../config');

var teamcity = function (){};

teamcity.prototype.deployReview = function(){
    console.log('deploy review!!!!');
    return true;
}


module.exports = new teamcity();