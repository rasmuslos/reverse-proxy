const fs = require('fs').promises;
const util = require('util');
const signale = require('signale');

const root = process.cwd()

class Config {
    /**
     * Create a config object
     * 
     * @param {String} file The path to the file to be read
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
     * @returns {String | Array} The value of the given key
     */
    get(key) {        
        if(typeof key == "string")
            return this._get(key.split("."))
        else
            return this._get(key)
    }

    /**
     * Read the data from the file
     */
    async readData() {
        await this._parse(this.file)
        return this
    }

    /**
     * Get a value from a key that is an array
     * 
     * @param {Array} arr The key where the value can be found
     * @param {Object} obj A JSON object in which the key is contained
     * 
     * @returns {String | Array} The value of the given key
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
     * Load a file into a json object
     * 
     * @param {String} file The path where the file can be found
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