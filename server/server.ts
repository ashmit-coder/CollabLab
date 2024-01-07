import app from "./index"
import { createServer } from "node:http";
import { Server } from "socket.io";
import { InitialConnect } from "./controllers/controlelers.socket"
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, "./.env") });

const PORT = process.env.PORT || 5000;

const server = createServer(app);
const socket = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

socket.on("connection",InitialConnect);

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});


