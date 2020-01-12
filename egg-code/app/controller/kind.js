'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getkindlist() {
    const { ctx } = this;
    const result = await ctx.service.kind.getkindlist();
    ctx.body = {
      code: 1,
      result,
      mes: '获取成功',
    };
  }
  async add() {
    const { ctx } = this;
    const $sql = await ctx.service.kind.select(ctx.request.body);
    if ($sql.length > 0) {
      ctx.body = {
        code: 0,
        mes: '失败 美妆种类已存在',
      };
      return;
    }
    await ctx.service.kind.add(ctx.request.body);
    ctx.body = {
      code: 1,
      mes: '成功',
    };
  }
  async del() {
    const { ctx } = this;
    await ctx.service.kind.del(ctx.request.body);
    ctx.body = {
      code: 1,
      mes: '删除成功',
    };
  }
  async edit() {
    const { ctx } = this;
    await ctx.service.kind.edit(ctx.request.body);
    ctx.body = {
      code: 1,
      mes: '修改成功',
    };
  }
}

module.exports = HomeController;
