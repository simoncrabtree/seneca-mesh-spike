require('seneca')({tag: 'organisations-service', silent: false})
.use('mesh', {pins: [
  'cmd:listOrganisations'
  ]
})
.add('cmd:listOrganisations', function(msg, done) {
  done(null, {organisations: [{id:1, name:'Org 1'}]})
})
