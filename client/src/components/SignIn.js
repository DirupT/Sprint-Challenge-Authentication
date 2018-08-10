import React from 'react';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <form>
                <input placeholder='Username' name='username' value={this.state.username} onChange={this.handleInput} type='text' />
                <input placeholder='Password' name='password' value={this.state.password} onChange={this.handleInput} type='password' />
                <button>Log in</button>
            </form>
        );
    }
}

export default SignIn