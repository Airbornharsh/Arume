let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("NO IO Here");
    }
    return io;
  },
};
