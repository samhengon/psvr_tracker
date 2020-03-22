const robot = require('robotjs')
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

// Every 1 second, wake up and check the drift
setInterval(() => {
    const logExpression = `PSVR=${psvrRotation}, Phone=${phoneRotation}`
    console.log(logExpression)
    // Check if you are centered, using the PHONE gyro data (only trust your phone)
    if (phoneRotation >= -2 && phoneRotation <= 2) {
        // Calculates the drift (to be tuned)
        const estDrift = phoneRotation - psvrRotation
        // If the drifting delta is too much, send a keyboard input to re-center
        // NOTE: you should map this key in your game to work!
        if (!(Math.abs(estDrift) <= 3)) {
            console.log(`potential drifting! delta(phone-psvr)=${estDrift}! ${logExpression}`)
            console.log(`Sending VR recenter ctrl+space...`)
            robot.keyTap('space', 'control')
        }
    }
}, 1000);