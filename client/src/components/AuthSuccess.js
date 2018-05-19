import React, { Component } from 'react';

export default class AuthSuccess extends Component {
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (param[0] === "token") {
                localStorage.setItem("auth_token", param[1]);
            }
        }
        const url = '/';
        window.opener.open(url, '_self');
        window.opener.focus();
        window.close();
    }
    render() {
        return <div>AUTH SUCCESS</div>;
    }
}