const http = require('http')
const url = require('url')
const axios = require('axios')
const mypages = require('./mypages')

http.createServer((req, res) => {
  let dicURL = url.parse(req.url, true)
  if (dicURL.pathname == "/") {
    axios.get("http://localhost:3000/pessoas")
      .then(resp => {
        let pessoas = resp.data
        let pessoasOrdenadas = pessoas.sort((p1, p2) => (p1.nome < p2.nome) ? -1 : 1)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(mypages.pessoasPage(pessoasOrdenadas))
      })
      .catch(erro => {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end(erro)
      })
  } else if (dicURL.pathname.startsWith("/p")) {
    axios.get("http://localhost:3000/pessoas?id=" + dicURL.pathname.substring(1)).then(resp => {
      let pessoa = resp.data[0];

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(mypages.pessoaPage(pessoa))
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end("Operação não suportada")
  }
}).listen(7000)
