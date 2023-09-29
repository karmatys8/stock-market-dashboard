module.exports = function override (config, env) {
  console.log('override')
  let loaders = config.resolve
  loaders.fallback = { "querystring": require.resolve("querystring-es3") }
  
  return config
}