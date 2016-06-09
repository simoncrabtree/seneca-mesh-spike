require('seneca')({tag: 'logging-service'})
  .use('logger')
  .use('mesh', {
    auto: true,
    listen: [
      {pin: 'role:logging', model: 'observe'}
    ]
  })