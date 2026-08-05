let ioInstance = null;

const initRealtime = (server, allowedOrigins = []) => {
  const { Server } = require("socket.io");
  ioInstance = new Server(server, {
    cors: {
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.includes("localhost") || origin.includes("127.0.0.1")) {
          return callback(null, origin || true);
        }
        return callback(null, origin || true);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    },
    transports: ["polling", "websocket"],
    allowEIO3: true,
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  ioInstance.on("connection", (socket) => {
    socket.on("crm:join", (room) => {
      if (room) socket.join(String(room));
    });

    socket.emit("crm:connected", { connected: true, at: new Date().toISOString() });
  });

  return ioInstance;
};

const emitCrmEvent = (event, payload = {}, room = null) => {
  if (!ioInstance) return;
  const eventData = {
    ...payload,
    emittedAt: new Date().toISOString(),
  };
  if (room) {
    ioInstance.to(String(room)).emit(event, eventData);
  } else {
    ioInstance.emit(event, eventData);
  }
};

const getIo = () => ioInstance;

module.exports = {
  initRealtime,
  emitCrmEvent,
  getIo,
};
