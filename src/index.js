const configLoader = require("./loaders/configLoader")
const utilLoader = require("./loaders/utilLoader")
const expressLoader = require("./loaders/expressLoader")

const proxy = require("./util/proxy")

const signale = require("signale")

;(async function() {
    signale.time("startup")

    await configLoader.init()
    await utilLoader.init()
    await proxy.init()
    await expressLoader.init()

    signale.timeEnd("startup")
})()