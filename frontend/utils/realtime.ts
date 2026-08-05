import { io, Socket } from "socket.io-client";

const getSocketUrl = () => {
  let apiUrl =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
    (typeof window !== "undefined" && (import.meta as any).env?.VITE_API_URL) ||
    "http://localhost:5000/api/v1";

  if (typeof window !== "undefined" && window.location) {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    if (!process.env.NEXT_PUBLIC_API_URL) {
      if (host === "localhost" || host === "127.0.0.1") {
        apiUrl = "http://localhost:5000/api/v1";
      } else {
        apiUrl = `${protocol}//${host}:5000/api/v1`;
      }
    }
  }

  return apiUrl.replace(/\/api\/v1\/?$/, "");
};

let crmSocket: Socket | null = null;

export const getCrmSocket = (): Socket | null => {
  if (typeof window === "undefined") return null;
  if (!crmSocket) {
    const socketUrl = getSocketUrl();
    crmSocket = io(socketUrl, {
      transports: ["polling", "websocket"],
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });
  } else if (!crmSocket.connected) {
    crmSocket.connect();
  }
  return crmSocket;
};

export const closeCrmSocket = () => {
  if (crmSocket) {
    crmSocket.disconnect();
    crmSocket = null;
  }
};
