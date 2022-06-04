const fs = require('fs')
const fastify = require("fastify")()
const {coinCount} = require("./p3-module");

// Create server
fastify.get('/', (request, reply) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            reply
                .code(500)
                .header('Content-Type', 'text/html; charset=utf-8')
                .send('<h1> Error Occurred <h1>')
        }
        else {
            reply
                .code(200)
                .header('Content-Type', 'text/html; charset=utf-8')
                .send(data)
        }
    })
})


// Same as lab 4 put into url and calls this code
fastify.get('/coin', (request, reply) => {
    const {count = 0, denom = 0} = request.query
    const coinValue = coinCount({denom, count})
    reply
        .code(200)
        .header('Content-Type', 'text/html; charset=utf-8')
        .send(
            count && denom
                ?`<h2>Value of ${count} of ${denom} is ${coinValue}</h2> <br /> <a href="/">Home<a>`
                :'<h2> Enter denom and count </h2>'
        )
})

// Same as lab 4 just add a switch in here
fastify.get('/coins', (request, reply) => {
    let {option} = request.query
    option = parseInt(option)

    let coinValue; let option1; let option2;
    let coins = [
        {denom: 25, count: 2},
        {denom: 1, count: 7}
    ]
    option1 = parseInt(option1)
    option2 = parseInt(option2)

    switch (option) {
        case 1:
            coinValue = coinCount({denom: 5, count: 3}, {denom: 10, count: 2})
            break
        case 2:
            coinValue = coinCount(...coins)
            break
        default:
            coinValue = 0
            break
    }
    reply
        .code(200)
        .header('Content-Type', 'text/html; charset=utf-8')
        .send(
            `<h2>Option ${option} value is ${coinValue}</h2><br /><a href = '/'>Home</a>`
        )
})

const listenIP = 'localhost';
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        // fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
// fastify.log.info(`Server listening on ${address}`);
console.log(`Server listening on ${address}`);
});