import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Message history cache (in-memory)
let messageHistory = [];

// Clean up messages older than 12 hours periodically
setInterval(() => {
  const cutoff = Date.now() - 12 * 60 * 60 * 1000; // 12 hours ago
  const beforeCount = messageHistory.length;
  messageHistory = messageHistory.filter(msg => msg.timestamp >= cutoff);
  const afterCount = messageHistory.length;
  if (beforeCount !== afterCount) {
    console.log(`Auto-cleaned ${beforeCount - afterCount} messages older than 12 hours.`);
  }
}, 60000); // Check every minute

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET /api/messages -> Retrieve message history
  if (req.method === 'GET' && req.url === '/api/messages') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(messageHistory));
    return;
  }

  // POST /api/messages -> Post a new message, save to cache, and broadcast
  if (req.method === 'POST' && req.url === '/api/messages') {
    let body = '';
    let bodyLimitExceeded = false;

    req.on('data', chunk => {
      if (bodyLimitExceeded) return;
      body += chunk.toString();
      // Impose 10 KB payload size limit to prevent memory exhaustion attacks
      if (body.length > 10240) {
        bodyLimitExceeded = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large (limit 10KB)' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (bodyLimitExceeded) return;
      try {
        const msg = JSON.parse(body);
        if (msg && msg.id) {
          msg.timestamp = msg.timestamp || Date.now();
          messageHistory.push(msg);

          // Keep cache clean immediately (limit to last 12 hours)
          const cutoff = Date.now() - 12 * 60 * 60 * 1000;
          messageHistory = messageHistory.filter(m => m.timestamp >= cutoff);

          // Cap the cache to the latest 500 messages to prevent memory bloating
          if (messageHistory.length > 500) {
            messageHistory = messageHistory.slice(-500);
          }

          // Broadcast message to all WebSocket subscribers
          const broadcastData = JSON.stringify({ event: 'message', message: JSON.stringify(msg) });
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastData);
            }
          });
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // Fallback: Serve static files from the build ('dist') directory
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
  
  // If file doesn't exist or doesn't have an extension, fall back to index.html for SPA routing
  const ext = path.extname(filePath);
  if (!ext) {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(__dirname, 'dist', 'index.html');
    }

    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.woff2': 'font/woff2',
      '.apk': 'application/vnd.android.package-archive'
    };

    const extName = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extName] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

// Attach WebSocket Server
const wss = new WebSocketServer({ server });

const broadcastClientCount = () => {
  const count = wss.clients.size;
  const countData = JSON.stringify({ event: 'user_count', count });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(countData);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');
  broadcastClientCount();

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    broadcastClientCount();
  });

  ws.on('error', console.error);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
