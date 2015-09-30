# On Wakeup

Watches for the computer to fall asleep and then triggers an event callback on wakeup

```js
var onWakeup = require('on-wakeup')
onWakeup(function () {
  console.log('Device sleep detected')
})
```