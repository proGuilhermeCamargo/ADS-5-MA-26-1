const express = require("express")
const cors = require("cors")


const app = express()
const port = 3000

app.use(cors())

app.get('/teste', (req, res) => {
    res.send("Parmejiana")
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})