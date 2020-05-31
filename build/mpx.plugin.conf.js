const path = require('path')

function resolve (dir = '') {
  return path.join(__dirname, '..', dir)
}

// 可以在此配置mpx webpack plugin，会assign进build.js里new创建plugin的config里
module.exports = {
  resolveMode: 'webpack',
  writeMode: 'changed',
  modeRules: {
  },
  defs: {},
}
