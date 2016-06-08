setTimeout(function(){

  require('seneca')({tag: 'organisations-service', silent: false})
  .use('mesh', {pins: [
    'cmd:listOrganisations',
    'cmd:getOrganisation'
    ]
  })
  .add('cmd:listOrganisations', function(msg, done) {
    done(null, {organisations: [{id:1, name:'Org 1'}]})
  })
  .add('cmd:getOrganisation', function(msg, done) {
    done(null, {organisation: {id:1, name:'Org 1'}})
  })

}, 10000)
