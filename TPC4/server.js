const http = require('http')
const fs = require('fs/promises')
const url = require('url')
const homeTemplate = require('./hometemplate').home

const server = http.createServer(async (req, res) => {
  let urlData = url.parse(req.url, true)
  let path = urlData.pathname

  if (path === '/') {
    let page = homeTemplate({})
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(page)
  } else if (path === '/insert' && req.method === 'POST') {

  } else if (path === '/w3.css') {
    let data = await fs.readFile('w3.css')
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' })
    res.end(data)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end("404 not found")
  }
}).listen(7777)