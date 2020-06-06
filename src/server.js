const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

//configurar a pasta public
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

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
    //req.query query da html
    //console.log(req.query)

    //res.sendFile(__dirname + "/views/create-point.html") IDEM
    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) => {
    //req.body
    //console.log(req.body)
    query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
    
        function afterInsertData(err) {
            if(err) {
                console.log(err)
                return console.log("Erro no Cadastro!")
            }
            console.log("Cadastrado com sucesso")
            console.log(this)
            return res.render("create-point.html", {saved : true }) //passou aqui pra cima pq quer que ele retorne o ok só depois que fizer o cadastro
        }
    
        //bota sem os () pq senão ele executaria direto e agora que ela como callback
        db.run(query, values, afterInsertData)

    
})

server.get("/search", (req,res) => {

    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})

    }


    if(search == "all") {
        //pesquisa vazia
        db.all(`SELECT * FROM places `, function(err, rows) {
            if(err) {
                return console.log(err)
                
            }
            const total = rows.length
            //mostra a pag html com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total})
        })
    } else {

    //pegar os dados do banco de dados
    // Consultar os dados  da tabela
    // O LIKE %% dá isso. Ex. Digitou sul. chapadão do sul - rio do sul - sulamericana
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
            
        }
        const total = rows.length
        //mostra a pag html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total})
    })
}

    //res.sendFile(__dirname + "/views/create-point.html") IDEM
})

//ligar o servidor
server.listen(3000)
