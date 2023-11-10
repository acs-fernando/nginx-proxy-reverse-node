const express = require('express')
var randomName = require('node-random-name')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req,res) => {
  let lista = ''
  const pr1 = new Promise((resolve, reject) => {
    const create = `CREATE TABLE IF NOT EXISTS people(id int auto_increment, nome varchar(255), primary key (id))`
    connection.query(create)
    const sql = `INSERT INTO people(nome) values('${randomName()}')`
    connection.query(sql)
    resolve()
  })
  const pr2 = new Promise((resolve, reject) => {
    connection.connect(() => {
      connection.query("SELECT nome FROM people", (err, result, fields) => {
        if (err) {
          reject()
        }
        if (result && result.length > 0) {
          lista += '<ul>'
          result.forEach(r => {
            lista += `<li>${r.nome}</li>`
          })
          lista += '</ul>'
        }
        resolve()
      })
    })
  })
  pr1.then(() => {
    pr2.then(() => {
      res.send('<h1>Full Cycle Rocks!</h1>'+lista)
    })
  })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})