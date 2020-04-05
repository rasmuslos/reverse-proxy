const signale = require("signale")
const readline = require('readline');

const { deleteCache } = require("./switch")

/**
 * Wait for new commands in the terminal
 */
const watch = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', async (input) => {
        if(input == "reload") {
            await proxyConfig.readData()
            deleteCache()
        } else if(input == "routes")
            console.info(proxyConfig.getRoutes())
        else
            console.error("Unknown command");
    });
}

module.exports = watch