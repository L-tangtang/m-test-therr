import React, { Component } from 'react';
import Img2 from '../assets/image/2.png';

import { Select } from 'antd';
const { Option } = Select;
const provinceData = ['超级会员', '会员', '访客'];
export default class Login extends Component {
    state = {
        username: '',
        password: '',
        phone: '',
        type: '',
    };
    render() {
        return (
            <div className="login-wrapper">
                <div className="t-login-box">
                    <div className="t-login-img">
                        <img src={Img2} alt="" />
                        <h1>语雀</h1>
                        <h3>专业的美妆知识库</h3>
                    </div>
                    <div className="t-login-btn">
                        <p>
                            <input
                                type="text"
                                placeholder="账号"
                                value={this.state.username}
                                onChange={e => {
                                    this.setState({
                                        username: e.target.value.trim(),
                                    });
                                }}
                            />
                        </p>
                        <p>
                            <input
                                type="password"
                                placeholder="密码"
                                value={this.state.password}
                                onChange={e => {
                                    this.setState({
                                        password: e.target.value.trim(),
                                    });
                                }}
                            />
                        </p>
                        <p>
                            <input
                                type="text"
                                placeholder="手机号"
                                value={this.state.phone}
                                onChange={e => {
                                    this.setState({
                                        phone: e.target.value.trim(),
                                    });
                                }}
                            />
                        </p>
                        <li>
                            <Select
                                defaultValue={provinceData[0]}
                                style={{ width: 120 }}
                                onChange={this.handleProvinceChange.bind(this)}
                            >
                                {provinceData.map(province => (
                                    <Option key={province}>{province}</Option>
                                ))}
                            </Select>
                        </li>

                        <p>
                            <input
                                type="button"
                                value="注册"
                                onClick={this.headleRegister.bind(this)}
                            />
                        </p>
                        <p
                            onClick={() => {
                                this.props.history.push('/login');
                            }}
                        >
                            已有账号去登陆
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    async headleRegister() {
        let { username, password, phone, type } = this.state;
        let res = await this.http('/register', 'post', {
            username,
            password,
            phone,
            type,
        });
        alert('注册' + res.data.mes);
        if (res.data.code === 1) {
            this.props.history.push('/login');
        }
    }
    handleProvinceChange = value => {
        this.setState({
            type: value,
        });
    };
}
