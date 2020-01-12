'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class HomeController extends Controller {
  async list() {
    const { ctx } = this;
    const result = await ctx.service.index.list();
    console.log(ctx);
    ctx.body = {
      code: 1,
      result,
      mes: '获取成功',
    };
  }
  async login() {
    const { ctx } = this;
    const { password } = ctx.request.body;
    const result = await ctx.service.index.login(ctx.request.body);
    if (result.length === 0) {
      ctx.body = {
        code: 0,
        mes: '账号未注册',
      };
      return;
    }
    if (result[0].password !== password) {
      ctx.body = {
        code: 0,
        mes: '密码错误',
      };
      return;
    }
    const token = jwt.sign({ ...result[0] }, this.app.config.keys);

    ctx.body = {
      code: 1,
      result,
      token,
      mes: '登陆成功',
    };
  }
  async register() {
    const { ctx } = this;
    const { phone } = ctx.request.body;
    const $sql = await ctx.service.index.select(ctx.request.body);

    if ($sql.length > 0) {
      ctx.body = {
        code: 0,
        mes: '失败 账号已存在',
      };
      return;
    }
    const telStr = /^[1]([3-9])[0-9]{9}$/;
    if (!telStr.test(phone)) {
      ctx.body = {
        code: 0,
        mes: '手机号不规范',
      };
      return;
    }
    await ctx.service.index.register(ctx.request.body);
    ctx.body = {
      code: 1,
      mes: '成功',
    };
  }
}

module.exports = HomeController;
