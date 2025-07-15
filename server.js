// server.js
import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app.js';
import dbConnect from './src/Config/dbConnect.js';
import { setupSocket } from './src/Socket/socket.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await dbConnect();
    const server = http.createServer(app);

    // Setup socket.io
    setupSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
}

startServer();
