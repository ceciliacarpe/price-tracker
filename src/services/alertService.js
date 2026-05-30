
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const checkPriceAlert = async  (productId, precioActual) => {
    const hace90dias = new Date()
    hace90dias.setDate(hace90dias.getDate() - 90)

    const historial = await prisma.priceHistory.findMany({
        where: {
            productId: productId,
            recordedAt: { gte: hace90dias }
        }
    })

    const precios = historial.map(h => h.price).sort((a, b) => a - b)
    const indice = Math.floor(precios.length * 0.2)
    const percentil20 = precios[indice]

    if (precioActual < percentil20){
        const nueva = await prisma.alert.create({
                data: {
                    productId: productId,
                    price: precioActual,
                }
            })
    }

}
module.exports = {checkPriceAlert}