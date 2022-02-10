const EventEmitter = require('events')

class BaseOutput extends EventEmitter {
  constructor(options = {}) {
    super()
    this.options = { ...this.constructor.defaults, options }
    this.app = this.options.app
    this.state = null
    this.isReady = false
  }

  initialize() {
    this.isReady = true
    this.emit('ready')
  }

  setState(state) {
    this.state = state
    this.emit('stateChange', state)
  }

  reset() {
    throw new Error('The reset() method must be defined by Output subclass')
  }
}

module.exports = BaseOutput
