import React, { Component } from 'react';
import Img from '../assets/image/1.png';
import Img2 from '../assets/image/2.png';
export default class Home extends Component {
    render() {
        return (
            <div className="home-wrapper">
                <div className="header">
                    <img src={Img2} alt="" className="t-img" />
                    <div className="t-home-nav">
                        <span>
                            <b>语雀</b>
                        </span>
                        <span>产品功能</span>
                        <span>数据安全</span>
                        <span>空间</span>
                        <span>发现</span>
                    </div>
                    <div className="t-home-main">
                        <span onClick={() => this.props.history.push('/login')}>登陆</span>
                        <span onClick={() => this.props.history.push('/register')}>快速注册</span>
                    </div>
                </div>
                <div className="main">
                    <img src={Img} alt="" />
                </div>
            </div>
        );
    }
}
