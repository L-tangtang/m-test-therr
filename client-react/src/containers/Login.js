import React, { Component } from 'react';
import Img2 from '../assets/image/2.png';
export default class Login extends Component {
    state = {
        username: '',
        password: '',
        indent: '',
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
                        <p
                            onClick={() => {
                                this.props.history.push('/register');
                            }}
                        >
                            没有账号去注册
                        </p>
                        <p>
                            <input
                                type="button"
                                value="登陆"
                                onClick={this.headleLogin.bind(this)}
                            />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    async headleLogin() {
        let { username, password } = this.state;
        let res = await this.http('/login', 'post', { username, password });
        alert(res.data.mes);
        if (res.data.mes === '账号未注册') {
            this.props.history.push('/register');
            return;
        }
        if (res.data.code === 1) {
            localStorage.setItem('user', JSON.stringify(res.data.result[0].username));
            localStorage.setItem('token', JSON.stringify(res.data.token));
            localStorage.setItem('type', JSON.stringify(res.data.result[0].type));
            this.props.history.push('/main');
        }
    }
   
}
