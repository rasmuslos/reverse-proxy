const streamify = require('stream-array')
const httpProxy = require('http-proxy')
const { findRoute } = require("./switch")

const proxy = httpProxy.createProxyServer({
    ws: true,
    xfwd: true,
    secure: false,
});

/**
 * Get the route of an web request and proxy the traffic to it
 * 
 * @param req The request object from the express server
 * @param res The responce object from the express server
 * @param next The next handler from express
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

module.exports = { proxyWeb }