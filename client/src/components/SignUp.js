import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
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

    register = () => {
        if (this.state.username === '' || this.state.password === '') {
            alert('Please enter a username and password!');
            return;
        }

        const user = { username: this.state.username, password: this.state.password }

        axios
            .post('http://localhost:5000/api/register', user)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/jokes');
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <form onSubmit={event => event.preventDefault()}>
                <input placeholder='Username' name='username' value={this.state.username} onChange={this.handleInput} type='text' />
                <input placeholder='Password' name='password' value={this.state.password} onChange={this.handleInput} type='password' />
                <button onClick={this.register}>Sign up</button>
            </form>
        );
    }
}

export default SignUp