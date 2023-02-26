const http = require("http")
const fs = require("fs/promises")
const url = require("url")

http.createServer((req, res) => {
  let dicURL = url.parse(req.url, true)
  let num = Number.parseInt(dicURL.pathname.substring(1), 10)
  if (num) {
    fs.readFile(`arq${num}.xml`).then(content => {
      res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' })
      res.end(content)
    }).catch(err => {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end("Error: " + err)
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end("Not found")
  }
}).listen(8888)
