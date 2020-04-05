let cache = {}
const deleteCache = () => cache = {}

/**
 * Find a route from a given request (The first matching will be the result)
 * 
 * @param req The request from express
 * @param res The responce from express
 * @param next the next handler from express
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
            // Check if this route only matches at a specific path
            if(pathRegex == null) {
                match = route
                break;
            } else {
                let path = req.path

                // Normalise path (remove / at start and end)
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