/**
 * Local API Server for KalaGato Docusaurus Docs Editor
 * Runs on port 3002 and handles reading/writing markdown files to disk.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;
const DOCS_DIR = path.resolve(__dirname, 'docs');

function getMarkdownFiles(dir, relativePath = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const relFilePath = path.join(relativePath, file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath, relFilePath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      // Simple title extraction
      const match = content.match(/^#\s+(.+)$/m);
      const title = match ? match[1] : file;
      results.push({
        name: file,
        path: relFilePath,
        fullPath: filePath,
        title: title.trim(),
        content: content
      });
    }
  });
  return results;
}

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

  // API to list all editable documentation files
  if (req.method === 'GET' && req.url === '/api/files') {
    try {
      const humanDocsDir = path.join(DOCS_DIR, 'human_org');
      const agentDocsDir = path.join(DOCS_DIR, 'agent_org');
      
      const humanFiles = fs.existsSync(humanDocsDir) ? getMarkdownFiles(humanDocsDir, 'human_org') : [];
      const agentFiles = fs.existsSync(agentDocsDir) ? getMarkdownFiles(agentDocsDir, 'agent_org') : [];

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        files: {
          human_org: humanFiles,
          agent_org: agentFiles
        }
      }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
    return;
  }

  // API to save a modified markdown file back to disk
  if (req.method === 'POST' && req.url === '/api/save') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { relativePath, content } = payload;

        if (!relativePath || content === undefined) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Missing relativePath or content' }));
          return;
        }

        // Prevent directory traversal attacks
        const targetPath = path.resolve(DOCS_DIR, relativePath);
        if (!targetPath.startsWith(DOCS_DIR)) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Unauthorized file path' }));
          return;
        }

        fs.writeFileSync(targetPath, content, 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'File saved successfully' }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
    return;
  }

  // Default fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`Docs Editor backend server listening on http://localhost:${PORT}`);
});
