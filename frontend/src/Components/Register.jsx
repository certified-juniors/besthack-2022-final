import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import config from "../config";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            login: '',
        }
        this.handler = this.handler.bind(this);
    }

    handler(e) {

        e.preventDefault();
    }

    render(d) {

        return (
            <Container>
                <h2 className='text-center'>Регистрация</h2>

                <Form onSubmit={this.handler()}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Введите Логин</Form.Label>
                        <Form.Control id="login" type="login" placeholder="Логин"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Введите Email</Form.Label>
                        <Form.Control id="email" type="email" placeholder="name@example.com" onChange={() => this.setState(this.state.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Введите пароль</Form.Label>
                        <Form.Control id="password" type="password" placeholder="Пароль"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label=
                            "Согласен с условиями пользовательского соглашения"/>
                    </Form.Group>
                    <Button size="xxl" variant="primary" type="submit" formMethod={"POST"} formAction={"http://" + config.host + "/register"}>
                        Зарегистрироваться
                    </Button>
                </Form>


            </Container>
        )
    }
}

export default Register;

