const signale = require("signale")
const Config = require("./Config")

class ProxyConfig extends Config {
    /**
     * Create a config from the file /config.json
     */
    constructor() {
        super(`config.json`)

        this.routes = null
    }

    /**
     * Clear the cache when the config is read again
     */
    async readData() {
        this.full = null
        await this._parse(this.file)

        return this
    }

    /**
     * Get an array that contains the targets
     * 
     * @returns {Array} An array that contains the targets as objects
     */
    getRoutes() {
        if(this.routes == null) {
            let routes = this.get("routes")

            let validated = []

            for(let index in routes) {
                const element = routes[index]

                if(this._validate(element) == true)
                    validated.push(element)
            }

            this.routes = validated
            return validated
        } else
            return this.routes
    }

    /**
     * @param {Object} object Validate an object
     */
    _validate(object) {        
        const { route, domainRegex, pathRegex } = object

        if(route == null || typeof route != "string") return signale.error(`The route ${route || "NOT DEFINED"} is invalid (Should be "http://[host]:<port>/<path>")`)
        if(domainRegex == null || typeof domainRegex != "string") return signale.error(`The domainRegex should be an valid regex (Route ${route})`)
        if(pathRegex != null && typeof pathRegex != "string") return signale.error(`The pathRegex should be an valid regex (Route ${route})`)

        return true
    }
}

module.exports = ProxyConfig