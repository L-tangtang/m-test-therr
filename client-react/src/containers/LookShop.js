import React, { Component } from 'react';

export default class LookShop extends Component {
    state = {
        author: '',
    };
    render() {
        const { record } = this.props.location.query;
        const { author } = this.state;
        return (
            <div>
                <h3>
                    <span>标题：</span>
                    <b>{record.goods}</b>
                </h3>

                <h1>
                    <span>内容：</span>
                    <b>{record.effect}</b>
                </h1>
                <h2>
                    <span>作者：</span>
                    <b>{author}</b>
                </h2>
                <h1>
                    <span>时间：</span>
                    <b>{new Date().toLocaleString()}</b>
                </h1>
            </div>
        );
    }
    componentDidMount() {
        let name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
        this.setState({
            author: name,
        });
    }
}
