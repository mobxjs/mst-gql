const { existsSync, readFileSync } = require('fs');
const { join, resolve } = require('path');

exports.getConfig = function getConfig() {
  // Get config path from executing directory;
  const configPath = resolve(process.cwd(), 'mst-gql.config.js');
  if (existsSync(configPath)) {
    return require(configPath);
  } else {
    return {};
  }
}
