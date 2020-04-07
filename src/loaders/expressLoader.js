const http = require("http")
const https = require("https")

const path = require("path")
const express = require("express")
const helmet = require('helmet')

const signale = require("signale")

const root = process.cwd()
const SecureConfig = require("./../util/config/SecureConfig")
const { proxyWeb, proxyWs } = require("../util/proxy")

const listen = server => new Promise((resolve, reject) => server.listen(web.port, resolve))
const errorWatcher = server => server.on("error", error => signale.error(error))

const init = async () => {
    const secureConfig = new SecureConfig()
    await secureConfig.readData()

    const app = express()
    let server = null

    if(secureConfig.enabled) {
        server = https.createServer({
            key: secureConfig.key,
            cert: secureConfig.cert
        }, app)
    } else
        server = http.createServer(app)

    app.use(helmet())

    app.use(express.static(path.resolve(root, "public")))
    app.use(proxyWeb)

    app.all("*", (req, res) => res.status(404).type("txt").send("You are trying to access an non existing route. More information can be found here https://github.com/rasmuslos/reverse-proxy"))

    server.on("upgrade", proxyWs)

    errorWatcher(server)
    await listen(server)
}

module.exports = { init }