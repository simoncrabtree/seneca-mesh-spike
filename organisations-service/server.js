var numberOfCalls = 0;

var commands = {
  'cmd:listOrganisations': function(msg, done) {
    done(null, {organisations: [{id:1, name:'Org 1'}]})
  },
  'cmd:getOrganisation': function(msg, done) {
    numberOfCalls++;
    console.log("CALLS=", numberOfCalls)
    done(null, {organisation: {id:1, name:'Org 1'}})
  },
  'cmd:createOrganisation': function(msg, done) {
    done(null, {created: msg})
  }
}
  
var seneca = require('seneca')({tag: 'organisations-service', silent: false})
seneca.use('mesh', {pins: Object.keys(commands)})

for(var cmd in commands) {
  seneca.add(cmd, commands[cmd])
}
