var sleepCheckInterval
var lastSleepCheck = false
var sleepCheckTime = 3e3
var EE = require('events')
var emitter = new EE()

module.exports = function (cb) {
  emitter.on('wakeup', cb)

  if (!sleepCheckInterval) {
    // setup interval
    sleepCheckInterval = setInterval(function () {
      var t = Date.now()
      if (lastSleepCheck && (t - lastSleepCheck) > sleepCheckTime*3)
        emitter.emit('wakeup') // missed 3 checks, let's run the callbacks 
      lastSleepCheck = t
    }, sleepCheckTime)
  }
  
  // unreference the timer so that the program can close
  if (sleepCheckInterval.unref)
    sleepCheckInterval.unref()

  return sleepCheckInterval
}
