import React from 'react';
import axios from 'axios';
import { FormGroup } from 'reactstrap';
import {
    LoginContainer, LoginForm, WordContainer, Word, ForgotPassword,
    ForgotForm, BottomLoginContent, BottomText, SignIn, StyledFormControl, StyledButton
} from './ReusableComponents/Login';

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