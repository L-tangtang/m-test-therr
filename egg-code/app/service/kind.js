'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async getkindlist() {
    const result = await this.app.mysql.select('serieslist');
    return result;
  }
  async select({ kind }) {
    const result = await this.app.mysql.select('serieslist', { where: { kind } });
    return result;
  }
  async add({ kind }) {
    const result = await this.app.mysql.query(
      `insert into serieslist (kind) values ("${kind}")`
    );
    return result;
  }
  async del({ id }) {
    const result = await this.app.mysql.delete('serieslist', { id });
    return result;
  }
  async edit({ kind, id }) {
    const result = await this.app.mysql.update('serieslist', { kind }, { where: { id } });
    return result;
  }
}

module.exports = HomeController;
