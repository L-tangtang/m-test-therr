'use strict';

const Controller = require('egg').Controller;
const tabList = require('../../config/tableList');

class HomeController extends Controller {
  async index() {
    // 视图权限
    const roleRes = await this.service.indent.searchRole(this.ctx.info);
    const newArr = roleRes.map(item => tabList[item.menu]);
    console.log(newArr); // 前端需要的数据格式
    const list = [];
    newArr.forEach(item => {
      const index = list.findIndex(jtem => jtem.classType === item.classType);
      if (index !== -1) {
        list[index].sub.push({
          name: item.name,
          key: item.key,
          to: item.to,
        });
        return;
      }

      list.push({
        classType: item.classType,
        key: 'sub' + item.key,
        icon: item.icon,
        sub: [
          {
            name: item.name,
            key: item.key,
            to: item.to,
          },
        ],
      });
    });

    this.ctx.body = { code: 0, msg: '', list };
  }
}

module.exports = HomeController;
