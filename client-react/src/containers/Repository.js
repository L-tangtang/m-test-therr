import React, { Component } from 'react';

import { Table, Modal, Button } from 'antd';

const { confirm } = Modal;

export default class userList extends Component {
    state = {
        data: [],
        visible: false,
        kind: '',
        id: 0,
        indent: '',
        typeDefault: '',
        pagination: { defaultPageSize: 6 },
        columns: [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '美妆知识库',
                dataIndex: 'kind',
                key: 'kind',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <div>
                        {this.state.indent === '超级会员' ? (
                            <span>
                                <span onClick={this.headleDel.bind(this, record)}>
                                    <Button onClick={this.showConfirm.bind(this)}> Delete</Button>
                                </span>
                                <span>
                                    <Button
                                        type="primary"
                                        onClick={this.showModal.bind(this, 'EDIT', record)}
                                        style={{ margin: '0 10px' }}
                                    >
                                        Edit
                                    </Button>
                                </span>
                            </span>
                        ) : (
                            '无权限'
                        )}
                        <span>
                            <Modal
                                rowKey={(record, index) => index}
                                title="Basic Modal"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            >
                                <p>
                                    <input
                                        className="inp"
                                        type="text"
                                        placeholder="商品种类"
                                        value={this.state.kind}
                                        onChange={e => {
                                            this.setState({
                                                kind: e.target.value.trim(),
                                            });
                                        }}
                                    />
                                </p>
                            </Modal>
                        </span>
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
                    onClick={this.showModal.bind(this, 'ADD')}
                    style={{ margin: '0 10px' }}
                >
                    新建
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
        this.http('/getkindlist').then(res => {
            if (res.data.code === 1) {
                this.setState({
                    data: res.data.result,
                });
            }
        });
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
                let res = await this.http('/del/kind', 'delete', { id: this.state.id });
                if (res.data.code === 1) {
                    this.http('/getkindlist').then(res => {
                        if (res.data.code === 1) {
                            this.setState({
                                data: res.data.result,
                            });
                        }
                    });
                }
            },
        });
    }
    showModal(type, record) {
        if (type === 'EDIT') {
            this.setState({
                visible: true,
                typeDefault: type,
                kind: record.kind,
                type: record.type,
                id: record.id,
            });
        } else if (type === 'ADD') {
            this.setState({
                visible: true,
                typeDefault: type,
                kind: '',
                type: '',
            });
        }
    }

    handleOk = () => {
        let { kind, id } = this.state;
        this.setState({
            visible: false,
        });
        if (this.state.typeDefault === 'EDIT') {
            this.http('/edit/kind', 'put', {
                kind,
                id,
            }).then(res => {
                alert(res.data.mes);
                if (res.data.code === 1) {
                    this.http('/getkindlist').then(res => {
                        if (res.data.code === 1) {
                            this.setState({
                                data: res.data.result,
                            });
                        }
                    });
                }
            });
        } else if (this.state.typeDefault === 'ADD') {
            this.http('/add/kind', 'post', {
                kind,
            }).then(res => {
                alert('添加' + res.data.mes);
                if (res.data.code === 1) {
                    this.http('/getkindlist').then(res => {
                        if (res.data.code === 1) {
                            this.setState({
                                data: res.data.result,
                            });
                        }
                    });
                }
            });
        }
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
}
