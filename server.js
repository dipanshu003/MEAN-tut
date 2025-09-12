// const http = require("http");
// const port = process.env.PORT || 3000;
// const app = require("./backend/app");

// // const server = http.createServer((req, res) => {
// //   res.end("This is my First node.js server...");
// // });

// app.set("port", port);
// const server = http.createServer(app);

// server.listen(port);

const http = require("http");
const port = normalizePort(process.env.PORT || 3000);
const app = require("./backend/app");

app.set("port", port);
const server = http.createServer(app);

// Helper functions
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Server is listening on ${bind}`);
}

// Start the server
server.listen(port);

// Event listeners for error and success
server.on("error", onError);
server.on("listening", onListening);
