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
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'https://price-tracker-nu-olive.vercel.app'
    ]
    if (!origin || allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
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
    try{
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

    }catch (error){
        if (error.code == 'P2002'){
            res.status(400).json({error: 'El producto ya está siendo seguido'})
        }else{
            res.status(500).json({error: error.message})
        }
    }
    
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
    try{
        const {productId} = req.query
        const alertas = await prisma.alert.findMany({
        where: {
            ...(productId && { productId: parseInt(productId) })
        }
        })

        res.json(alertas)
    }catch (error){
        res.status(500).json({error: error.message})
    }
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

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  })
})




app.listen(3000, () => {
    console.log('Servidor corriendo en ${import.meta.env.VITE_API_URL}')

})