const cors = require('cors')

const express = require('express')
const { PrismaClient } = require('@prisma/client')

const { getAllProducts, getProductById } = require('./src/services/productService')
const { startPriceUpdater } = require('./src/services/priceUpdater')
const { register, login } = require('./src/services/authService')
const { authMiddleware } = require('./src/middleware/auth')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}))

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

app.post ('/api/productos/track', authMiddleware, async (req, res) => {
    const producto = await getProductById(req.body.externalId)

    const nuevo = await prisma.product.create({
        data: {
            externalId: producto.id,
            name: producto.title,
            imageUrl: producto.image,
            category: producto.category,
            price: producto.price,
            userId: req.userId
        }
        
    })
    res.json(nuevo)
})

app.get ('/api/productos/mis-productos', authMiddleware, async (req, res) => {

    const productos = await prisma.product.findMany({
        where: { userId: req.userId}
    })

    res.json(productos)
})

app.get ('/api/productos/:id/historial', async (req, res) => {
    const id = parseInt(req.params.id)

    const historial = await prisma.priceHistory.findMany({
        where: {productId: id}
    })

    res.json(historial)

})

app.get('/api/alertas',authMiddleware, async (req, res) => {
    const alertas = await prisma.alert.findMany()

    res.json(alertas)
})

app.post('/api/auth/register', async (req, res) => {
    try{

        const usuario = await register(req.body.email, req.body.password)
        res.json(usuario)
        
    }catch (error){
        res.status(400).json({error: error.message})
    }
})

app.post('/api/auth/login', async (req, res) => {
    try{

        const token = await login(req.body.email, req.body.password)
        res.json(token)

    }catch (error){
        res.status(400).json({error: error.message})
    }
})




app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')

})