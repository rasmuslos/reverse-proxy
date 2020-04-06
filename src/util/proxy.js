const streamify = require("stream-array")
const httpProxy = require('http-proxy')
const { findRoute } = require("./switch")

let proxy = null

const init = async () => {

    proxy = httpProxy.createProxyServer({
        ws: true,
        xfwd: true,
        secure: false,
    });

    proxy.on('error', function (err, req, res) {
        res.status(500).type("txt").send("Internal server error")
    });

}

/**
 * Get the destination from an url and forward the traffic to the destination
 * 
 * @param req The request object of the express server
 * @param res The responce object of the express server
 * @param next The next handler
 */
const proxyWeb = (req, res, next) => {
    const route = findRoute(req)
    if(route == null) return next()

    proxy.web(req, res, {
        target: route,
        changeOrigin: true,
        buffer: streamify(req.rawBody || []),
    })
}

// TODO: Add ws support
const proxyWs = (res, socket, upgradeHead) => {
    socket.end();
}

module.exports = { proxyWeb, proxyWs, init }