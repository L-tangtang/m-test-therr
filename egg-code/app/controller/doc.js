'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getdoclist() {
    const { ctx } = this;
    const result = await ctx.service.doc.getdoclist();
    ctx.body = {
      code: 1,
      result,
      mes: '获取成功',
    };
  }
  async add() {
    const { ctx } = this;
    const $sql = await ctx.service.doc.select(ctx.request.body);
    if ($sql.length > 0) {
      ctx.body = {
        code: 0,
        mes: '失败 牌子已存在',
      };
      return;
    }
    await ctx.service.doc.add(ctx.request.body);
    ctx.body = {
      code: 1,
      mes: '成功',
    };
  }
  async del() {
    const { ctx } = this;
    await ctx.service.doc.del(ctx.request.body);
    ctx.body = {
      code: 1,
      mes: '删除成功',
    };
  }
}

module.exports = HomeController;
