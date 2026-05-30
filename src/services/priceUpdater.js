const cron = require('node-cron')
const { PrismaClient } = require ('@prisma/client')
const {getProductById} = require ('./productService')
const { checkPriceAlert } = require('./alertService')

const prisma = new PrismaClient()

const startPriceUpdater = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        
        const productos = await prisma.product.findMany()

        for (const producto of productos){
            const prod = await getProductById(producto.externalId)
            const precioActual = prod.price

            //Variación aleatoria
            const variacion = (Math.random() * 0.06) - 0.03
            const precioFinal = parseFloat((precioActual * (1 + variacion)).toFixed(2))

            const nuevo = await prisma.priceHistory.create({
                data: {
                    productId: producto.id,
                    price: precioFinal
                }
            })

            await prisma.product.update({
                where: { id: producto.id},
                data: {price: precioFinal}
            })

            await checkPriceAlert(producto.id, precioFinal)


            console.log(`Precio actualizado: ${producto.name} -> ${precioFinal}`)
        } 
        
    })

}

module.exports = {startPriceUpdater}
