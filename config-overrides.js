module.exports = {
    webpack: function(config, env) {
        return config
    }, 
    jest: function(config) {
        return config
    },
    devServer: function(configFunction) {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost)
            return config
        }
    }
}