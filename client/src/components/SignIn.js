import React from 'react';
import axios from 'axios';
import { FormGroup } from 'reactstrap';
import {
    LoginContainer, LoginForm, WordContainer, Word, ForgotPassword,
    ForgotForm, BottomLoginContent, BottomText, SignUp, StyledFormControl, StyledButton
} from './ReusableComponents/Login';

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

    login = () => {
        if (this.state.username === '' || this.state.password === '') {
            alert('Please enter a username and password!');
            return;
        }

        const credentials = { username: this.state.username, password: this.state.password }

        axios
            .post('http://localhost:5000/api/login', credentials)
            .then(response => {
                localStorage.setItem('token', response.data);
                this.props.history.push('/jokes');
            })
            .catch(err => console.log(err));
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