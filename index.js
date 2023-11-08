// server.js
const http = require('http');
const socketIo = require('socket.io');

const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');

const connectDB = require('./config/db.js');
const userRouter = require('./Routes/UserRouter.js');
const messageRouter = require('./Routes/MessageRouter.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, 
  { cors: { origin: '*' } }, 
  );



const users = [];
io.on("connection", (socket) => {
  socket.on('setUserName', function(username) {
    let exists = false;

    users.forEach(user => {
      if(user.username == username) {
        user.userID = socket.id;
        exists = true;
      }
    })

    if(!exists) {
      users.push({
        userID: socket.id,
        username: username,
      });
    }

    console.log("users ", users);
  });

  socket.on("private-message", ({ content, to, timestamp }) => {
    let receiverId = "";

    users.forEach(user => {
      if(user.username == to) receiverId = user.userID
    });

    socket.to(receiverId).emit("private-message", { content, timestamp });
  });
});

io.on("disconnect", (socket) => {
  console.log("DESCONNECTED !!!")
  socket.disconnect(true)
});

dotenv.config();
app.use(cors());
app.use(express.json());
connectDB()

// main router
app.get('/', (req, res) => {
    res.send('API is running...');
});

// other router 
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> {
    console.log(`Server running in http://localhost:${PORT}`);
});