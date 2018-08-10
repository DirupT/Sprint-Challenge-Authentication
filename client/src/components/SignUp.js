import React from 'react';
import axios from 'axios';
import { FormGroup } from 'reactstrap';
import {
    LoginContainer, LoginForm, WordContainer, Word, ForgotPassword, InvalidCredentials,
    ForgotForm, BottomLoginContent, BottomText, SignIn, StyledFormControl, StyledButton
} from './ReusableComponents/Login';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            userExists: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    register = () => {
        // If username or password fields are empty then shown an alert and return
        if (this.state.username === '' || this.state.password === '') {
            alert('Please enter a username and password!');
            return;
        }

        const user = { username: this.state.username, password: this.state.password }

        // Posts user to register api on server
        axios
            .post('http://localhost:5000/api/register', user)
            .then(response => {
                // Adds token to local storage then redirects to the jokes component
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/jokes');
            })
            .catch(err => {
                if (!err || !err.response) return;
                // Switches between error messages
                switch (err.response.data.error) {
                    case "There is already a user with that name.":
                        return this.setState({ userExists: err.response.data.error });

                    default:
                        return console.log(err.response);
                }
            });
    }

    render() {
        return (
            <LoginContainer>

                <LoginForm onSubmit={event => event.preventDefault()}>

                    <WordContainer>
                        <Word>Sign Up</Word>
                    </WordContainer>

                    <FormGroup>
                        <StyledFormControl value={this.state.username} onChange={this.handleInput} type="username" name="username" placeholder="Username" />
                    </FormGroup>

                    <FormGroup>
                        <StyledFormControl value={this.state.password} onChange={this.handleInput} type="password" name="password" placeholder="Password" />
                    </FormGroup>

                    <StyledButton type='submit' onClick={this.register}>Sign Up</StyledButton>

                    {/*If there is an existing user with that name then display error message*/}
                    {this.state.userExists.length > 0 ? <InvalidCredentials>{this.state.userExists}</InvalidCredentials> : null}

                    <ForgotForm>
                        <ForgotPassword href='#_'>Forgot password?</ForgotPassword>
                    </ForgotForm>

                </LoginForm>

                <BottomLoginContent>

                    <BottomText>
                        Have an account? <SignIn to='/signin'>Sign in</SignIn>
                    </BottomText>

                </BottomLoginContent>

            </LoginContainer>
        );
    }
}

export default SignUp