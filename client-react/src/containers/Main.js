import React, { Component } from 'react';

import Map from '../router/map';
import Img2 from '../assets/image/2.png';
import Img from '../assets/image/1.jpg';
//Layout.Sider 支持响应式布局。

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default class Main extends Component {
    state = {
        collapsed: false,
        name: '',
        indent: '',
        searchVal: '',
    };
    render() {
        return (
            <div>
                <div className="header">
                    <div className="left">
                        <img src={Img2} alt="" /> <b>语雀</b>
                    </div>
                    <div className="right">
                        <input
                            type="text"
                            placeholder="搜索"
                            value={this.state.searchVal}
                            onChange={e => {
                                this.setState({
                                    searchVal: e.target.value.trim(),
                                });
                            }}
                            onKeyDown={e => {
                                if (e.keyCode === 13) {
                                }
                            }}
                        />
                        <ul>
                            <span>
                                <b>工作台</b>
                            </span>
                            <span>空间</span>
                            <span>发现</span>
                            <span>帮助</span>
                            <span>反馈</span>
                        </ul>
                        <ol>
                            <li>\(^o^)/~</li>
                            <li>(*^▽^*)</li>
                            <li>
                                <img src={Img} alt="" />
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="box-main">
                    <Layout>
                        <Sider
                            width="230"
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                        >
                            <div className="logo" />
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1">
                                    <Icon type="user" />
                                    <span
                                        className="nav-text"
                                        onClick={() => {
                                            this.props.history.push('/main/userlist');
                                        }}
                                    >
                                        用户列表
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="video-camera" />
                                    <span
                                        className="nav-text"
                                        onClick={() => {
                                            this.props.history.push('/main/document');
                                        }}
                                    >
                                        美妆文档
                                    </span>
                                </Menu.Item>
                                {this.state.indent !== '访客' ? (
                                    <Menu.Item key="3">
                                        <Icon type="upload" />
                                        <span
                                            className="nav-text"
                                            onClick={() => {
                                                this.props.history.push('/main/repository');
                                            }}
                                        >
                                            美妆知识库
                                        </span>
                                    </Menu.Item>
                                ) : (
                                    ''
                                )}
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header
                                style={{
                                    background: '#fff',
                                    padding: '0 14px',
                                    fontSize: '18px',
                                }}
                            >
                                <span style={{ color: 'green' }}> {this.state.name}</span>
                                <b style={{ margin: '0 10px' }}>|</b>
                                <span
                                    style={{
                                        margin: '0 5px',
                                        padding: '2px 8px',
                                        background: '#eee',
                                        border: '1px solid #ccc',
                                        fontSize: '14px',
                                    }}
                                    onClick={() => {
                                        localStorage.clear();
                                        this.props.history.push('/login');
                                    }}
                                >
                                    退出
                                </span>
                            </Header>
                            <Content style={{ margin: '24px 16px 0' }}>
                                <div
                                    style={{
                                        padding: 24,
                                        background: '#fff',
                                        minHeight: 620,
                                    }}
                                >
                                    <Map routes={this.props.children} {...this.props}></Map>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                <b>语雀</b> 十万阿里人都在用的笔记与文档知识库
                            </Footer>
                        </Layout>
                    </Layout>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({
            name: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '你好',
        });
        const type = localStorage.getItem('type') ? JSON.parse(localStorage.getItem('type')) : '';
        this.setState({
            indent: type,
        });
    }
}
