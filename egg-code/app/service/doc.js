'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async getdoclist() {
    const result = await this.app.mysql.select('doclist');
    return result;
  }
  async select({ goods, plate }) {
    const result = await this.app.mysql.select('doclist', { where: { goods, plate } });
    return result;
  }
  async add({ goods, plate, effect }) {
    const result = await this.app.mysql.query(
      `insert into doclist (goods,plate,effect) values ("${goods}","${plate}","${effect}")`
    );
    return result;
  }
  async del({ id }) {
    const result = await this.app.mysql.delete('doclist', { id });
    return result;
  }
}

module.exports = HomeController;
