import electronDebug from 'electron-debug';
import loadYamlFile from 'load-yaml-file';

/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
loadYamlFile('src/config.yml').then((conf) => {
  if (conf.window.devTools === true) {
    electronDebug({ showDevTools: true });
  }
});



// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
})

// Require `main` process to boot app
require('./index')