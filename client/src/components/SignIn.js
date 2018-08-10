import React from 'react';
import axios from 'axios';
import { FormGroup } from 'reactstrap';
import {
    LoginContainer, LoginForm, WordContainer, Word, ForgotPassword, InvalidCredentials,
    ForgotForm, BottomLoginContent, BottomText, SignUp, StyledFormControl, StyledButton
} from './ReusableComponents/Login';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            invalidUsername: '',
            invalidPassword: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    login = () => {
        // If username or password fields are empty then shown an alert and return
        if (this.state.username === '' || this.state.password === '') {
            alert('Please enter a username and password!');
            return;
        }

        const credentials = { username: this.state.username, password: this.state.password }

        // Posts credentials to login api on server
        axios
            .post('http://localhost:5000/api/login', credentials)
            .then(response => {
                // Adds token to local storage then redirects to the jokes component
                localStorage.setItem('token', response.data);
                this.props.history.push('/jokes');
            })
            .catch(err => {
                if (!err || !err.response.data) return;
                // Switches between error messages
                switch (err.response.data.error) {
                    case "The username you entered doesn't belong to an account. Please check your username and try again.":
                        return this.setState({ invalidUsername: err.response.data.error, invalidPassword: '' });

                    case "Invalid password":
                        return this.setState({ invalidPassword: err.response.data.error, invalidUsername: '' })

                    default:
                        return console.log(err);
                }
            });
    }

    render() {
        return (
            <LoginContainer>

                <LoginForm onSubmit={event => event.preventDefault()}>

                    <WordContainer>
                        <Word>Sign In</Word>
                    </WordContainer>

                    <FormGroup>
                        <StyledFormControl value={this.state.username} onChange={this.handleInput} type="username" name="username" placeholder="Username" />
                    </FormGroup>

                    <FormGroup>
                        <StyledFormControl value={this.state.password} onChange={this.handleInput} type="password" name="password" placeholder="Password" />
                    </FormGroup>

                    <StyledButton type='submit' style={this.state.username.length > 0 || this.state.password.length > 0 ? { background: '#3897F0' } : { opacity: .3 }} onClick={this.login}>Log In</StyledButton>

                    {/*If user provides incorrect username or password then display error to screen*/}
                    {this.state.invalidUsername.length > 0 ? <InvalidCredentials>{this.state.invalidUsername}</InvalidCredentials> : null}
                    {this.state.invalidPassword.length > 0 ? <InvalidCredentials>{this.state.invalidPassword}</InvalidCredentials> : null}

                    <ForgotForm>
                        <ForgotPassword href='#_'>Forgot password?</ForgotPassword>
                    </ForgotForm>

                </LoginForm>

                <BottomLoginContent>

                    <BottomText>
                        Don't have an account? <SignUp to='/signup'>Sign up</SignUp>
                    </BottomText>

                </BottomLoginContent>

            </LoginContainer>
        );
    }
}

export default SignIn