const http = require("http")
const path = require("path")
const httpProxy = require("http-proxy")
const express = require("express")

const signale = require("signale")

const root = process.cwd()
const { web } = require("./../util/config")
const { proxyWeb, proxyWs } = require("../util/proxy")

const listen = server => new Promise((resolve, reject) => server.listen(web.port, resolve))
const errorWatcher = server => server.on("error", error => signale.error(error))

const init = async () => {
    const app = express()
    const server = http.createServer(app)

    app.use(express.static(path.resolve(root, "public")))
    app.use(proxyWeb)

    app.all("*", (req, res) => res.status(404).send("<h1>Proxy error</h1><p>You are trying to access an non existing route. More information can be found <a href='https://github.com/rasmuslos/reverse-proxy'>here</a></p>"))

    server.on("upgrade", proxyWs)

    errorWatcher(server)
    await listen(server)
}

module.exports = { init }