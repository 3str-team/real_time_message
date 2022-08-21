class socketController {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  on(messageName, callback) {
    return this.socket.on(messageName, callback);
  }

  changeValue(messageName, value) {
    this.io.emit(messageName, value);
  }
}

module.exports = socketController;
