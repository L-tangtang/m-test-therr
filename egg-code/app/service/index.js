'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async searchRole({ type }) {
    return await this.app.mysql.select('role_menu_table', { where: { type } });
  }
  async list() {
    const result = await this.app.mysql.select('userlist');
    return result;
  }
  async login({ username }) {
    const result = await this.app.mysql.select('userlist', { where: { username } });
    return result;
  }
  async select({ phone }) {
    const result = await this.app.mysql.select('userlist', { where: { phone } });
    return result;
  }
  async register({ username, password, phone, type }) {
    const result = await this.app.mysql.query(
      `insert into userlist (username, password, phone, type) values ("${username}","${password}","${phone}","${type}")`
    );
    return result;
  }
}

module.exports = HomeService;
