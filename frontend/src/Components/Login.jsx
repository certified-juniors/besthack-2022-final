import React from 'react';
import {Button, Container} from "react-bootstrap";
import Form from 'react-bootstrap/Form'

const Login = () =>
{
  return (
    <Container>
      <h2 className='text-center'>Вход</h2>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label>Введите Логин или Email</Form.Label>
          <Form.Control type="login" placeholder="Логин" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Введите пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль" />
        </Form.Group>

        <Button size = "xxl" variant="primary" type="submit">
          Вход
        </Button>
      </Form>


    </Container>
  )

}

export default Login;

