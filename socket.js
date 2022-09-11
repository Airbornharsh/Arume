let io;

module.exports = {
  init: (tempIo) => {
    io = tempIo;
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("NO IO Here");
    }
    return io;
  },
};
