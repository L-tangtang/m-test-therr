import React, { Component } from 'react';

import axios from 'axios';

export default (url, method = 'get', data = []) => {
    let configData = {};
    let type = method === 'get' ? 'params' : 'data';
    configData.method = method;
    configData.url = url;
    configData[type] = data;
    configData.headers = {
        authorToken: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : '',
    };
    return axios(configData).catch(error => {
        if (error.response && error.response.status === 404) {
            alert('接口不存在');
            return;
        }
        if (error.response && error.response.status === 500) {
            alert('服务器错误');
            return;
        }
    });
};

// 登陆拦截 重返登录页
export function Hi(Comp) {
    class High extends Component {
        componentWillMount() {
            if (localStorage.user === undefined) {
                alert('无权访问 请登录');
                this.props.history.push('/login');
            }
        }
        render() {
            return <Comp {...this.props} />;
        }
    }
    return High;
}
