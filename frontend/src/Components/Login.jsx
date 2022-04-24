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
      message: '',
      errors: ''
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
      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem('token', token);
        window.location.href = '/';
      } else {
        this.setState({ message: res.data.message });
      }
    }).catch(err => {
      this.setState({ message: err.message });
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
        <div className="vstack gap-2 col-md-5 mx-auto">
          <Form onSubmit={this.handler}>
            <h3>{this.state.message}</h3>
            <div className="col-auto">
              <Form.Group className="mb-3">
                <Form.Label>Введите Логин или Email</Form.Label>
                <Form.Control type="login" placeholder="Логин или почта" id="loginOrEmail" onChange={this.handleLoginOrEmailChange} />
              </Form.Group>
            </div>
            <div className="col-auto">
              <Form.Group className="mb-3">
                <Form.Label>Введите пароль</Form.Label>
                <Form.Control type="password" placeholder="Пароль" id='password' onChange={this.handlePasswordChange} />
              </Form.Group>
            </div>
            <Button size="xxl" variant="primary" type="submit">
              Вход
            </Button>
          </Form>
        </div>


      </Container>
    )
  }
}

export default Login;

