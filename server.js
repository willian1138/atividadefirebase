const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.json())

    

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/consulta', async (req, res) => {
    const peopleRef = db.collection('people').doc('associates')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})



app.post('/cadastrar', async (req, res) => {
    const name = req.body.name
    const status = req.body.status 
    { name , status}
    const peopleRef = db.collection('people').doc('associates')
    const res1 = await peopleRef.set({
        [name]: status
    })//,{ merge:true}) 
    res.redirect("/")
})



/*app.post('/atualizar', async (req, res) => {
    /*const name = req.body.name
    const newStatus = req.body.newStatus
    { name, newStatus }
    const { name, newStatus } = req.body
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.set({
        [name]: newStatus
    }, { merge: true }) 
    res.redirect("/consulta")
})
ele ficava criando novas sets nao refenciando a da local func cadastrar entao eu resolvi o problema colocando o botao
atualzar no mesma rota otimizando o meu codigo*/



app.post('/delete', async (req, res) => {
    const { name } = req.body.name
    const peopleRef = db.collection('people').doc('associates')
    const res2 = await peopleRef.delete({
        [name]: FieldValue

    })
    
   // res.status(200).render('home', {})
    
})
app.listen(port, () => console.log(`Servidor rodando na port: ${port}`))



//está faltando uma rota para home