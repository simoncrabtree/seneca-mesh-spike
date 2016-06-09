module.exports = function() {
  this.add('role:logging', function(message, callback) {
    console.log(message)
    callback()
  })
}