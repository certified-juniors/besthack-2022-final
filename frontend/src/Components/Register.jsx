import React from 'react';
import {Button, Container} from "react-bootstrap";
import Form from 'react-bootstrap/Form'

const Register = () =>
{
    function dontGoToLink(e) {
    e.preventDefault();
}

    return (
        <Container>
         <h2 className='text-center'>Регистрация</h2>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Form.Label>Введите Логин</Form.Label>
                    <Form.Control type="login" placeholder="Логин" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Введите Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Введите пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label=
                   "Согласен с условиями пользовательского соглашения"/>
                </Form.Group>
                <Button  size = "xxl" variant="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </Form>


        </Container>
    )

}

export default Register;

