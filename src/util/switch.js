let cache = {}
const deleteCache = () => cache = {}

/**
 * Find the target of a url
 * 
 * @param req The request object of the express server
 * @param res The responce object of the express server
 * @param next The next handler
 */
const findRoute = (req) => {
    const cacheKey = `${req.hostname}/${req.path}`

    if(cache[cacheKey] != null) return cache[cacheKey]

    let domain = req.hostname
    let match = null

    const routes = proxyConfig.getRoutes()

    for(let i in routes) {
        const { domainRegex, pathRegex, route } = routes[i]

        if(domain.match(domainRegex) != null) {
            if(pathRegex == null) {
                match = route
                break;
            } else {
                let path = req.path
                while(path.startsWith("/"))
                    path = path.substring(1, path.length)
                while(path.endsWith("/"))
                    path = path.substring(path.length - 1, 0)

                if(path.match(pathRegex)) {
                    match = route
                    break;
                }
            }
        }
    }

    cache[cacheKey] = match
    return match
}

module.exports = { findRoute, deleteCache }