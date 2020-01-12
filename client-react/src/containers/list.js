import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import wangEditor from 'wangeditor';

const { Option } = Select;

class DocAdd extends Component {
    state = {
        knownList: [],
        belong: '所属知识库',
    };

    render() {
        const { knownList, belong } = this.state;
        return (
            <div>
                <div>
                    ***文档标题
                    <Input type="text" ref="title" style={{ margin: '8px 0' }} />
                </div>

                <div style={{ margin: '8px 0' }}>***文档内容</div>
                <div ref="editor"></div>

                <div style={{ margin: '8px 0' }}>***所属知识库</div>
                <Select
                    ref="belong"
                    value={belong}
                    style={{ width: '100%' }}
                    onChange={value => this.setState({ belong: value })}
                >
                    {knownList.map((item, index) => {
                        return (
                            <Option key={index} value={index}>
                                {item}
                            </Option>
                        );
                    })}
                </Select>
                <Button onClick={this.headleAdd.bind(this)} style={{ margin: '8px 0' }}>
                    提交
                </Button>
            </div>
        );
    }

    componentDidMount() {
        this.initED();
        // 请求知识库
        this.http('/getkindlist').then(res => {
            if (res.data.code === 1) {
                let data = ['所属知识库'];
                res.data.result.forEach(item => {
                    data.push(item.kind);
                });
                this.setState({
                    knownList: data,
                });
            }
        });
    }

    //初始化编译器
    initED = () => {
        const ED = new wangEditor(this.refs.editor);
        ED.create();
        //图片转码
        ED.customConfig.uploadImgShowBase64 = true;
        //挂载
        this.ED = ED;
    };

    //提交数据
    headleAdd = async () => {
        let subData = {
            id: null,
            title: this.refs.title.input.value,
            content: this.ED.txt.html(),
            time: new Date().getTime(),
            belong: this.state.belong,
            author: localStorage.user,
        };
        this.http('/add', 'post', {
            goods: subData.title,
            plate: subData.content,
            effect: subData.belong,
        }).then(res => {
            alert('添加' + res.data.mes);
            this.props.history.push('/main/document');
        });
    };
}

export default DocAdd;
