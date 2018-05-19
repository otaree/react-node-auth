import React, { Component } from 'react';


export default class LoginButton extends Component {
    
    clickHandler = () => {
        const url = 'http://localhost:5000/google';
        const name= "google_login";
        const specs = 'width=500, height=500';
        window.open(url, name, specs);

    };

    render() {
        return (
            <button onClick={this.clickHandler}>Login</button>
        );
    }
}