import React, { Component } from 'react';

import { Table, Modal, Button } from 'antd';

const { confirm } = Modal;

export default class userList extends Component {
    state = {
        provinceData: [],
        data: [],
        visible: false,
        indent: '',
        pagination: { defaultPageSize: 6 },
        columns: [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '美妆商品',
                dataIndex: 'goods',
                key: 'goods',
            },
            {
                title: '美妆品牌',
                dataIndex: 'plate',
                key: 'plate',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <div>
                        {this.state.indent !== '访客' ? (
                            <span>
                                <span onClick={this.headleDel.bind(this, record)}>
                                    <Button onClick={this.showConfirm.bind(this)}> Delete</Button>
                                </span>
                                <span
                                    onClick={() =>
                                        this.props.history.push({
                                            pathname: '/main/lookShop',
                                            query: { record },
                                        })
                                    }
                                >
                                    <Button type="primary" style={{ margin: '0 10px' }}>
                                        Look
                                    </Button>
                                </span>
                            </span>
                        ) : (
                            '无权限'
                        )}
                    </div>
                ),
            },
        ],
    };
    render() {
        return (
            <div>
                <Button
                    type="primary"
                    onClick={() => this.props.history.push('/main/list')}
                    style={{ margin: '0 10px' }}
                >
                    Add
                </Button>
                <Table
                    pagination={this.state.pagination}
                    rowKey={(record, index) => index}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                />
            </div>
        );
    }
    async componentDidMount() {
        // 调用回去数据接口
        this.getDocList();
        // 获取身份
        const type = (await localStorage.getItem('type'))
            ? JSON.parse(localStorage.getItem('type'))
            : '';
        this.setState({
            indent: type,
        });
    }
    // 删除
    headleDel(record) {
        this.setState({
            id: record.id,
        });
    }
    showConfirm() {
        confirm({
            title: '确认要删除吗?',
            onOk: async () => {
                let res = await this.http('/del', 'post', { id: this.state.id });
                if (res.data.code === 1) {
                    this.getDocList();
                }
            },
        });
    }
    // 获取数据
    getDocList() {
        this.http('/getdoclist').then(res => {
            if (res.data.code === 1) {
                this.setState({
                    data: res.data.result,
                });
            }
        });
    }
}
