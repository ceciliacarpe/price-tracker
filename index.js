const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

app.get('/productos', async (req,res) => {
    const productos = await prisma.product.findMany()
    res.json(productos)

})

app.post('/productos', async (req, res) =>{
    const nuevo = await prisma.product.create({
        data: req.body
    })
    res.json(nuevo)
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')

})