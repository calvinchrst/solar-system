import socketio, { Server } from "socket.io";

let io: Server;

export const initIOSocket = function (httpServer: any) {
  io = socketio(httpServer);
  return io;
};

export const getIOSocket = function () {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
