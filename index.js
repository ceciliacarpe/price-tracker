const express = require('express')
const { PrismaClient } = require('@prisma/client')

const { getAllProducts, getProductById } = require('./src/services/productService')
const { startPriceUpdater } = require('./src/services/priceUpdater')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

startPriceUpdater()

app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

app.get('/productos', async (req,res) => {
    const productos = await getAllProducts()
    res.json(productos)

})

app.post('/productos', async (req, res) =>{
    const nuevo = await prisma.product.create({
        data: req.body
    })
    res.json(nuevo)
})

app.post ('/api/productos/track', async (req, res) => {
    const producto = await getProductById(req.body.externalId)

    const nuevo = await prisma.product.create({
        data: {
            externalId: producto.id,
            name: producto.title,
            imageUrl: producto.image,
            category: producto.category,
            price: producto.price
        }
        
    })
    res.json(nuevo)
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')

})