//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose() // configura o sqlite para mostrar mensagens no terminal

//iniciar o objeto que ira fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto bacno de dados para nossa operações
// db.serialize(() => {
// //     // Criar Tabela 
// //     // só com comandos sql
// //     // places é o nome definido por ele para o BD dos locais de coleta
// //     //usa aspas para poder quebrar a linha da função - template literals
// //     db.run(`         
// //         CREATE TABLE IF NOT EXISTS places (
// //             id INTEGER PRIMARY KEY AUTOINCREMENT,
// //             name TEXT,
// //             image TEXT,
// //             address TEXT,
// //             address2 TEXT,
// //             state TEXT,
// //             city TEXT,
// //             items TEXT

// //         );
// //     `)
        
// //     //Inserir Dados na Tabela
// //     //ele bota as interrogações para trocar mais tarde por dados dinamicos
// //     query = `
// //         INSERT INTO places (
// //             name,
// //             image,
// //             address,
// //             address2,
// //             state,
// //             city,
// //             items
// //         ) VALUES (?,?,?,?,?,?,?);
// //     `
// //     // const values = [
// //     //     "Colectoria",        
// //     //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
// //     //     "Guilherme Gemballa, Jardim América",
// //     //     " No. 260",
// //     //     "Santa Catarina",
// //     //     "Rio do Sul",
// //     //     "Resíduos Eletrônicos, Lâmpadas"
// //     // ]

// //     // const values = [
// //     //     "PaperSider",        
// //     //     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
// //     //     "Guilherme Gemballa, Jardim América",
// //     //     " No. 260",
// //     //     "Santa Catarina",
// //     //     "Rio do Sul",
// //     //     "Papéis e Papelão"
// //     // ]

// //     function afterInsertData(err) {
// //         if(err) {
// //             return console.log(err)
// //         }
// //         console.log("Cadastrado com sucesso")
// //         console.log(this)
// //     }

// //     //bota sem os () pq senão ele executaria direto e agora que ela como callback
// //     //db.run(query, values, afterInsertData)

// //     // Consultar os dados  da tabela
// //     // db.all(`SELECT * FROM places`, function(err, rows) {
// //     //     if(err) {
// //     //         return console.log(err)
// //     //     }
// //     //     console.log("Esse é o seu registro")
// //     //     console.log(rows)
// //     // })

// //     //deleta um dado da tabela
// //     db.run('DELETE FROM places WHERE id = ?', [5], function(err) {
// //         if(err) {
// //             return console.log(err)
// //         }
// //         console.log("Registro deletado com sucesso!")
        
// //     })
// // })