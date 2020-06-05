const express = require("express")
const server = express()

//configurar a pasta public
server.use(express.static("public"))


//utilizando o template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    //enquanto estiver desenvolvendo melhor sem cache
    noCache: true
})

//configurar caminhos da minha aplicação
// req requisição res respotas
server.get("/", (req,res) => {
    //res.sendFile(__dirname + "/views/index.html") trocou pelo render do nunjucks
    return res.render("index.html") // só o path pq já tá configurado o caminho lá em cima
})

server.get("/create-point", (req,res) => {
    //res.sendFile(__dirname + "/views/create-point.html") IDEM
    return res.render("create-point.html")
})

server.get("/search", (req,res) => {
    //res.sendFile(__dirname + "/views/create-point.html") IDEM
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)
