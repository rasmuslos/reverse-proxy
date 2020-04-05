const signale = require("signale")
const Config = require("./Config")

class ProxyConfig extends Config {
    /**
     * Create an Config Object from /config.json
     */
    constructor() {
        super(`config.json`)

        this.routes = null
    }

    /**
     * Delete cache when the file is reloaded
     */
    async readData() {
        this.full = null
        await this._parse(this.file)

        return this
    }

    /**
     * Get an array witch contains the routes
     * 
     * @returns {Array} An array witch contains the routes as Objects
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
     * 
     * Config scheme:
     * routes:
     *  - route: The route where the traffic should be send to
     *  - subdomains: An array, witch contains the subdomains, where the route should be used
     *  - paths (not required): Should the system only work on specific paths, for example (/api/)
     * 
     * @param {Object} The object witch should have the scheme above
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