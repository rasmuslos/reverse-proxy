const { load } = require("./../util/config")

const init = async () => {
    await load()
}

module.exports = { init }