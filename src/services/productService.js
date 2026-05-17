const axios = require('axios')


const getAllProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    return response.data

}

const getProductById = async (id) => {
    const product = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return product.data
}

module.exports = {getAllProducts, getProductById}