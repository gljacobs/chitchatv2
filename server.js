const express = require('express');
const socket = require('socket.io');
const socketioJwt = require('socketio-jwt');
const path = require("path");
const routes = require("./routes");
const db = require("./database/models");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Starts the server to begin listening and sync sequelize models
// =============================================================
db.sequelize.sync().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });

  //socket setup
  var io = socket(server, {
    pingTimeout: 60000
  });

  // io.use(socketioJwt.authorize({
  //   secret: 'your secret or public key',
  //   handshake: true
  // }));

  io.on("connection", (socket) => {
    console.log("Socket connection made:", socket.id);
    
    socket.on("disconnect", () => {
      console.log("Socket disconnnected");
    });
    //handle chat
    socket.on("chat", (data) => {
      console.log("Chat recieved ", data.user);
        io.sockets.emit("chat", data)
    });

    socket.on("login", (data) => {
      console.log("User logged in.. ", data.user);
        io.sockets.emit("login", data)
    });

    socket.on("logout", (data) => {
      console.log("User logged out.. ", data.user);
        io.sockets.emit("logout", data)
    });

    //handle typing
    // socket.on("typing", (data) => {
    //     socket.broadcast.emit("typing", data)
    // });
  })
})

