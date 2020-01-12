/* eslint valid-jsdoc: "off" */

'use strict';

// 白名单
const writeListData = require('./writeListData');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578481412796_9219';

  // add your middleware config here
  config.middleware = [ 'index' ];
  config.index = writeListData;
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql: {
      // database configuration
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123321',
        database: 'db_fxm',
      },
      // load into app, default true
      app: true,
      // load into agent, default false
      agent: false,
    },
    security: {
      csrf: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
