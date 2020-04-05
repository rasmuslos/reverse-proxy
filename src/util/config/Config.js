const fs = require('fs').promises;
const util = require('util');
const signale = require('signale');

const root = process.cwd()

class Config {
    /**
     * Consruct a config object
     * 
     * @param {String} file The path where the config file can be found
     */
    constructor(file) {
        signale.info("Reading config from", file)
        this.file = `${root}/${file}`
    }

    /**
     * Get a value from a given key
     * 
     * @param {String | Array} key The key where the value can be found
     * 
     * @returns {String | Array} The value from the given path
     */
    get(key) {        
        if(typeof key == "string")
            return this._get(key.split("."))
        else
            return this._get(key)
    }

    /**
     * Reload the config from the file
     */
    async readData() {
        await this._parse(this.file)
        return this
    }

    /**
     * Get a value from an array
     * 
     * @param {Array} path The key where the value can be found
     * 
     * @returns {String | Array} The value from the given path
     */
    _get(arr, obj = this.content) {
        const first = arr.shift()
        const element = obj[first]

        if(element == null || arr.length == 0)
            return element
        else
            return this._get(arr, element)
    }


    /**
     * Parse a string into a valid config object
     * 
     * @param {String} obj Parse the config from a given string
     */
    async _parse(file) {
        signale.time("config_reload")
        try {
            let content = await fs.readFile(file, "utf-8")
            content = JSON.parse(content)

            this.content = content
        } catch(error) {
            signale.error(`Cannot load ${file}`, error)
        }
        signale.timeEnd("config_reload")
    }
}

module.exports = Config