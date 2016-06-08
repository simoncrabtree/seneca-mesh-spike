
setTimeout(function(){

  function listOrganisations(msg, done) {
    done(null, {organisations: [{id:1, name:'Org 1'}]})
  }

  function getOrganisation(msg, done) {
    done(null, {organisation: {id:1, name:'Org 1'}})
  }

  function createOrganisation(msg, done) {
    done(null, {created: msg})
  }

  require('seneca')({tag: 'organisations-service', silent: false})
  .use('mesh', {pins: [
    'cmd:listOrganisations',
    'cmd:getOrganisation',
    'cmd:createOrganisation'
    ]
  })
  .add('cmd:listOrganisations', listOrganisations)
  .add('cmd:getOrganisation', getOrganisation)
  .add('cmd:createOrganisation', createOrganisation)
}, 10000)
