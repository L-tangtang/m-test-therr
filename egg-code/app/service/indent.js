'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async searchRole({ type }) {
    return await this.app.mysql.select('role_menu_table', { where: { type } });
  }
}

module.exports = HomeService;
