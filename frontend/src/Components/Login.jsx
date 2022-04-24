import React from 'react';
import { Button, Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import config from "../config";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOrEmail: '',
      password: '',
    }
    this.handler = this.handler.bind(this);
    this.handleLoginOrEmailChange = this.handleLoginOrEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }
  handler(e) {
    e.preventDefault();
    const { loginOrEmail, password } = this.state;
    const url = 'http://' + config.host + '/login' + '?loginOrEmail=' + loginOrEmail + '&password=' + password;
    axios(url, {
      method: 'POST',
    }).then(res => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    });
  }
  handleLoginOrEmailChange(event) {
    this.setState({ loginOrEmail: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  render() {
    return (
      <Container>
        <h2 className='text-center'>Вход</h2>

        <Form onSubmit={this.handler}>
          <Form.Group className="mb-3">
            <Form.Label>Введите Логин или Email</Form.Label>
            <Form.Control type="login" placeholder="Логин или почта" id="loginOrEmail" onChange={this.handleLoginOrEmailChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Введите пароль</Form.Label>
            <Form.Control type="password" placeholder="Пароль" id='password' onChange={this.handlePasswordChange}/>
          </Form.Group>

          <Button href = "/" size="xxl" variant="primary" type="submit">
            Вход
          </Button>
        </Form>


      </Container>
    )
  }
}

export default Login;

