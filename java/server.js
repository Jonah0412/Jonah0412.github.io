const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url}`);
    
    let filePath = req.url === '/' ? './html/index.html' : '.' + req.url;
    
    filePath = decodeURIComponent(filePath);
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                console.error(`Original URL: ${req.url}`);
                
                fs.readFile('./html/404.html', (err, content) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1><p>The page you requested could not be found.</p>', 'utf-8');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                console.error(`Server error for ${filePath}:`, err);
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            const headers = { 'Content-Type': contentType };
            
            if (extname === '.pdf') {
                headers['Content-Disposition'] = 'inline';
                headers['X-Content-Type-Options'] = 'nosniff';
            }
            
            res.writeHead(200, headers);
            res.end(content, 'utf-8');
            console.log(`Successfully served ${filePath} as ${contentType}`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Open portfolio at http://localhost:${PORT}/html/portfolio.html`);
    console.log(`Open PDF test page at http://localhost:${PORT}/html/pdf-test.html`);
}); 