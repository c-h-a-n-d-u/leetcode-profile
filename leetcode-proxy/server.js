const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const cors = require("cors");

const app = express();
const PORT = 4000; // any free port

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "OPTIONS"],
  credentials: true
}));

// Log incoming requests for debugging
app.use(morgan('dev'));

// Proxy POST requests on /leetcode-graphql to LeetCode GraphQL endpoint
app.use('/leetcode-graphql', createProxyMiddleware({
  target: 'https://leetcode.com/graphql',
  changeOrigin: true, // sets the origin header to the target URL
  pathRewrite: {
    '^/leetcode-graphql': '', // remove the prefix when forwarding the request
  },
  onProxyReq: (proxyReq, req, res) => {
    // Manually set headers if needed
    proxyReq.setHeader('Origin', 'https://leetcode.com');
    proxyReq.setHeader('Referer', 'https://leetcode.com');
  }
}));

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
