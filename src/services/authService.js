const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const register = async  (email, password) => {
   const hash = await bcrypt.hash(password, 10) 

   const nuevo = await prisma.user.create({
        data: {
            email: email,
            password: hash,
        }
    })

    return nuevo 

}

const login = async (email, password) => {
    const user = await prisma.user.findUnique(
        {
            where: {
                email: email
            }
        }
    )

    if(!user) throw new Error('User not found')
    
    const coincide = await bcrypt.compare(password, user.password)

    if (!coincide) throw new Error('Incorrect password')

    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return token

}

module.exports = {register, login}