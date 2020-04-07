const Config = require("./Config")

class SecureConfig extends Config {
    constructor() {
        super("ssl.json")
    }

    get enabled() {
        return this.get("enabled")
    }
    get key() {
        return this.get("key")
    }
    get cert() {
        return this.get("cert")
    }
}

module.exports = SecureConfig