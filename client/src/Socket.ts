import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL: string =
  process.env.NODE_ENV === "production"
    ? (import.meta.env.VITE_BACKEND_URL as string)
    : "http://localhost:5000";

export const socket = io(URL, {
  autoConnect: false,
});
