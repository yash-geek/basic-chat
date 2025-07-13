import { count } from 'console';
import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;




const app = express();
const server = http.createServer(app);
const io = new Server(server);

//handle all socket requests
io.on('connection',(socket)=>{
    //console.log('new User', socket.id)
    socket.on('user-message',message=>{
        io.emit('message',message);
    })
})




//express will handle all http requests
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res,next)=>{
    res.sendFile('/public/index.html')
})

server.listen(PORT,()=>{
    console.log(`the app is running on http://localhost:${PORT}`);
})