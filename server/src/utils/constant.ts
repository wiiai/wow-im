import * as fs from 'fs';
const appRoot = require('app-root-path');
const configPath = `${appRoot.path}/${process.env.APP_ENV}.config.json`;

export const isPrd = process.env.APP_ENV === 'live';

if (!fs.existsSync(configPath)) {
  throw Error(`make sure ${configPath} exist`)
}

export const config = require(configPath)

console.log(`current env:`, config)