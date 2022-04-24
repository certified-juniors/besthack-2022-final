import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import config from "../config";
import axios from 'axios';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            login: '',
            message: '',
            errors: ''
        }
        this.handler = this.handler.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
    }

    handler(e) {

        e.preventDefault();
        const { login, email, password } = this.state;
        const url = 'http://' + config.host + '/register' + '?login=' + login + '&email=' + email + '&password=' + password;
        axios(url, {
            method: 'POST',
        }).then(res => {
            if (res.data.message) {
                this.setState({ message: res.data.message });
            }
            if (res.data.errors ) {
                let merrors = '';
                for (let i = 0; i < res.data.errors.length; i++) {
                    merrors += res.data.errors[i] + '\n';
                }
            } 
        });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    }

    render() {

        return (
            <Container>
                <h2 className='text-center'>Регистрация</h2>
                <Form onSubmit={this.handler}>
                <h3>{this.state.message}</h3>
                <h3>{this.state.errors}</h3>
                    <Form.Group className="mb-3" >
                        <Form.Label>Введите Логин</Form.Label>
                        <Form.Control id="login" type="login" placeholder="Логин" value={this.state.login}
                            onChange={this.handleLoginChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Введите Email</Form.Label>
                        <Form.Control id="email" type="email" placeholder="name@example.com" value={this.state.email}
                            onChange={this.handleEmailChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Введите пароль</Form.Label>
                        <Form.Control id="password" type="password" placeholder="Пароль" value={this.state.password}
                            onChange={this.handlePasswordChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label=
                            "Согласен с условиями пользовательского соглашения" />
                    </Form.Group>
                    <Button size="xxl" variant="primary" type="submit" >
                        Зарегистрироваться
                    </Button>
                </Form>


            </Container>
        )
    }
}

export default Register;

