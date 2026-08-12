 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { io, } from "socket.io-client";

const getSocketUrl = () => {
  let apiUrl =
    (typeof process !== "undefined" && _optionalChain([process, 'access', _ => _.env, 'optionalAccess', _2 => _2.NEXT_PUBLIC_API_URL])) ||
    (typeof window !== "undefined" && _optionalChain([(import.meta ), 'access', _3 => _3.env, 'optionalAccess', _4 => _4.VITE_API_URL])) ||
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

let crmSocket = null;

export const getCrmSocket = () => {
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
