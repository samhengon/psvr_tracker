// const dgram = require('dgram')
// const server = dgram.createSocket('udp4')

// const HOST = '0.0.0.0'
// const PORT = 5555

// server.on('error', (err) => {
//     console.log(`server error:\n${err.stack}`)
//     server.close()
// })

// server.on('message', (msg, rinfo) => {
//     console.log(`server got: ${msg} from ${rinfo.address}`)
// })

// server.on('listening', () => {
//     const address = server.address()
//     console.log(`server listening ${address.address}:${address.port}`)
// })

// server.bind({
//     address: HOST,
//     port: PORT,
//     exclusive: true
// })

const robot = require('robotjs')
// const ks = require('node-key-sender')
const OpenTrack = require('opentrack')
const phoneServer = new OpenTrack.Server('127.0.0.1', 5555)
const psvrServer = new OpenTrack.Server('127.0.0.1', 6666)

let psvrRotation = 0, phoneRotation = 0

// Called when the server is listening
phoneServer.on('listening', address => {
    console.log(`Server listening on ${address}`)
})

// Called when the server is listening
psvrServer.on('listening', address => {
    console.log(`Server listening on ${address}`)
})

// Called every time opentrack sends an update
phoneServer.on('transformUpdated', transform => {
    // console.log(`Phone: [${transform.rotation['x']}`)
    phoneRotation = transform.rotation['x']
})

// Called every time opentrack sends an update
psvrServer.on('transformUpdated', transform => {
    // console.log(`PSVR: [${transform.rotation['x']}`)
    psvrRotation = transform.rotation['x']
})

setInterval(() => {
    const logExpression = `PSVR=${psvrRotation}, Phone=${phoneRotation}`
    console.log(logExpression)
    if (phoneRotation >= -2 && phoneRotation <= 2) {
        const estDrift = phoneRotation - psvrRotation
        if (!(Math.abs(estDrift) <= 3)) {
            console.log(`potential drifting! delta(phone-psvr)=${estDrift}! ${logExpression}`)
            console.log(`Sending VR recenter ctrl+space...`)
            robot.keyTap('space', 'control')
            // ks.sendCombination(['control', 'space'])
            // // debug purpose only
            // ks.sendCombination(['space'])
            //     .then((resolve) => {
            //         console.log(resolve)
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
        }
    }
}, 1000);