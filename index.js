const http = require('http');
const path = require('path')
const fs = require('fs')

const port = 8080;

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

    let extname = path.extname(filePath)

    let contentType = 'text/html'

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if(err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, 'utf-8')
                })
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content, 'utf-8')
        }
    })

})

server.listen(port, () => console.log(`Server running on port ${port}`))