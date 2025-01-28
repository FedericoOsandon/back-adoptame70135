const { Router } = require('express')
const { generarUsers } = require('../utils/mocks')
const compression = require('express-compression')
const { faker } = require('@faker-js/faker')

const router = Router()


// router.get('/user', (req, res) => {

//     res.send({
//         first_name: faker.person.firstName(),
//         last_name: faker.person.lastName(),
//         email: faker.internet.email(),
//         password: faker.internet.password()
//     })
// })


router.get('/simple', (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += i        
    }
    res.send(`La suma es ${sum}`)
})


router.get('/compleja', (req, res) => {
    let sum = 0
    for (let i = 0; i < 8e8; i++) { 
        sum += i        
    }
    res.send(`La suma es ${sum}`)
})

// artillery quick --count 40 --num 50 "http://localhost:8000/pruebas/simple" -o simple.json
// artillery quick --count 40 --num 50 "http://localhost:8000/pruebas/compleja" -o complja.json

// artillery run config.yaml --output testPerformance.json
// artillery report testPerformance.json -o testResult.html

// router.get('/logger', (req, res) => {
//     // req.logger.info('esto es un info')
//     // req.logger.warning('esto es un warning')
//     req.logger.fatal('esto es un error crítico')
//     res.send('probando loggers')
// })



// const operacionCompleja = () => {
//     let result = 0
//     for (let i = 0; i < 10e10; i++) {
//         result += i        
//     }
//     return result
// }

// app.get('/pruebas/suma', (req, res) => {
//     const result = operacionCompleja()
//     res.send(`El resultado es : ${result}`)
// })

// app.get('/pruebas/sumachild', (req, res) => {
//     const child = fork('./src/operacionCompleja.js')

//     child.send('Iniciar el calculo')

//     child.on('message', result => {
//         return res.send(`El resultado es : ${result}`)
//     })

// })

// const { suma } = require('sumac72830')
// console.log(suma(6, 7))


// router.use(compression({
//     brotli: {
//         enabled: true,
//         zlib: {}
//     }
// }))
// router.get('/compresion', (req, res) => {
//     let string = `Hola coders, soy un string ridiculamente largo`
//     for (let i = 0; i < 5e5; i++) {
//         string += `Hola coders, soy un string ridiculamente largo`        
//     }
//     res.send(string)
// })

// router.get('/mocks', (req, res) => {
//     let users = []
//     for (let i = 0; i < 100; i++) {
//         users.push(generarUsers())        
//     }

//     res.send({status: 'success', data: users})
// })

module.exports = router