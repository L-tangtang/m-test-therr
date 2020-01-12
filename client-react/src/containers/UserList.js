import React, { Component } from 'react';

import { Table } from 'antd';

export default class userList extends Component {
    state = {
        columns: [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '身份',
                dataIndex: 'type',
                key: 'type',
            },
        ],
    };
    render() {
        return (
            <div>
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
        let res = await this.http('/list', 'get');
        if (res.data.code === 1) {
            this.setState({
                data: res.data.result,
            });
        }
    }
}
