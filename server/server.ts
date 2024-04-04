import app from "./index"
import { createServer } from "node:http";
import { Server } from "socket.io";
import { InitialConnect , createRoom , joinRoom } from "./controllers/controlelers.socket"
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, "./.env") });

const PORT = process.env.PORT || 5000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:4173"]
    }
});

io.on("createRoom",createRoom);
io.on("connection",(socket)=>{
    InitialConnect(); // should be called only in development

    socket.on("create-room",createRoom) // creating a room in the database 
    
    socket.on("join-room",joinRoom)  // joining an existing room in the database
    
    socket.on("changes-to-whiteboard",(svg:string)=>{
        socket.broadcast.emit("changes-to-whiteboard",svg)
    });
    socket.on("object:added",(data:fabric.IEvent<MouseEvent>)=>{
        socket.broadcast.emit("object:added",data)
    })
    socket.on("disconnect",()=>console.log("discommunication"));
});


server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});


