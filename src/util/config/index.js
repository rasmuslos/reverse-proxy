const ProxyConfig = require("./ProxyConfig")

const load = async () => {
    let proxyConfig = new ProxyConfig()
    global.proxyConfig = await proxyConfig.readData()
}

module.exports = {
    load,

    mode: process.env.MODE || "production",
    web: {
        port: process.env.PORT || 80,
    },
}