var config = require('../config');

var agent = require('superagent');
var fs = require("fs");

var teamcity = function () { };

teamcity.prototype.deployReview = function () {
    // console.log('deploy review!!!!');

    var cert3 = fs.readFileSync('build/certificates/FAG-CA00-V2.pem');
    var cert4 = fs.readFileSync('build/certificates/FAG-CA01-V2.pem');

    return agent.post('https://teamcity.kls.fielmann.net/httpAuth/app/rest/buildQueue')
        .ca(cert3, cert4)
        .auth('monitoring', '8uW23fvU')
        .type('application/xml')
        .withCredentials()
        .send("<build><buildType id=\"KlsV8_SetVersion\"/></build>");

}


module.exports = new teamcity();