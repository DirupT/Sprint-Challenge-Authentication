import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export const LoginContainer = styled.div`
    max-width: 100%;
    width: 100vw;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoginForm = styled(Form)`
    max-width: 350px;
    width: 100%;
    padding: 22px 40px;
    border: 1px solid #e6e6e6;
`

export const WordContainer = styled(FormGroup)`
    display: flex;
    justify-content: center;
`

export const Word = styled.h1`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 175px;
    height: 51px;
`

export const ForgotPassword = styled.a`
    display: flex;
    justify-content: center;
    font-size: 12px;
    line-height: 14px;
    margin-top: 25px;
    color: #003569;
    &:hover {
        text-decoration: none;
        color: #003569;
    }  
`

export const ForgotForm = styled(FormGroup)`
    margin: 0;
`

export const BottomLoginContent = styled.div`
    max-width: 350px;
    width: 100%;
    padding: 8px 40px;
    border: 1px solid #e6e6e6;
    margin-top: 10px
`

export const BottomText = styled.div`
    font-size: 14px;
    color: #262626;
    margin: 15px;
    text-align: center;
`

export const SignUp = styled(Link)`
    color: #3897f0;
    &:hover {
        text-decoration: none;
        color: #3897f0;
    }
`

export const SignIn = styled(Link)`
    color: #3897f0;
    &:hover {
        text-decoration: none;
        color: #3897f0;
    }
`

export const StyledFormControl = styled(Input)`
    font-size: 12px;
    background: #fafafa;
    border: 1px solid #efefef;
    color: #999;
    height: 36px;
    line-height: 36px;
    &::placeholder {
        color: #999;
    }
`

export const StyledButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 28px;
    background: #3897F0;
    border-color: #3898F0;
    border-radius: 3px;
    border-style: solid;
    font-size: 14px;
    font-weight: 600;
    line-height: 26px;
    border-width: 1px;
    padding: 0;
    color: #FFF;
    &:hover {
        background: #3897F0;
        border-color: #3898F0;
    }
`

export const InvalidCredentials = styled.p`
    color: rgb(237, 73, 86);
    line-height: 18px;
    font-size: 14px;
    margin-top: 18px;
    word-break: break-all;
`