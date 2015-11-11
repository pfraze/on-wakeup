var sleepCheckInterval
var lastSleepCheck = false
var SLEEP_CHECK_INTERVAL = 10e3
var NUM_MISSABLE_INTERVALS = 3
var EE = require('events')
var emitter = new EE()

module.exports = function (cb) {
  emitter.on('wakeup', cb)

  if (!sleepCheckInterval) {
    // setup interval
    sleepCheckInterval = setInterval(function () {
      var t = Date.now()
      if (lastSleepCheck && (t - lastSleepCheck) > SLEEP_CHECK_INTERVAL*NUM_MISSABLE_INTERVALS)
        emitter.emit('wakeup') // missed NUM_MISSABLE_INTERVALS checks, let's run the callbacks 
      lastSleepCheck = t
    }, SLEEP_CHECK_INTERVAL)
  }
  
  // unreference the timer so that the program can close
  if (sleepCheckInterval.unref)
    sleepCheckInterval.unref()

  return sleepCheckInterval
}
