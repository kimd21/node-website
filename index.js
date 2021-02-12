let http = require('http');
let fs = require('fs');
let url = require('url');

http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  // Return index page for root path
  if (q.pathname === '/') {
    fs.readFile('./index.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data)
      return res.end();
    })
    return;
  }

  // Return error 404 page if path N/A, else return corresponding page
  let filename = '.' + q.pathname;
  filename = filename.includes('.html') ? filename : filename + '.html';
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      let htmlFile = fs.readFileSync('./404.html');
      res.write(htmlFile);
      return res.end();
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.write(data);
    return res.end();
  })  
}).listen(8080);