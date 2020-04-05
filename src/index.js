const configLoader = require("./loaders/configLoader")
const utilLoader = require("./loaders/utilLoader")
const expressLoader = require("./loaders/expressLoader")

const signale = require("signale")

;(async function() {
    signale.time("startup")

    await configLoader.init()
    await utilLoader.init()
    await expressLoader.init()

    signale.timeEnd("startup")
})()