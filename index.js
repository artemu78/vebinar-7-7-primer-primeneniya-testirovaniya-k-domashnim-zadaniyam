var mime = require("mime");
var http = require("http");
var fs = require("fs");
var path = require("path");

// Create a server object
http
  .createServer(function (req, res) {
    // Extract requested file name
    var fileName = req.url === "/" ? "index.html" : req.url.substring(1);
    var filePath = path.join(__dirname, fileName);
    const extname = path.extname(filePath);

    // Read and serve the requested HTML file
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("404 Not Found");
        res.end();
      } else {
        //   res.writeHead(200, { "Content-Type": "text/html" });
        res.writeHead(200, { "Content-Type": mime.getType(extname) });
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8080); // The server object listens on port 8080
