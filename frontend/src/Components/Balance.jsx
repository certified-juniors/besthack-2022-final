import React, {useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import {useEffect} from "react";
import axios from 'axios';
import config from "../config";


const Balance = () =>
{

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState(0)
  const [login, setLogin] = useState('');
  
  const getUser = () => {
    axios.post('http://' + config.host + '/get-user-info-by-login?login='+login).then((resp) => {
      console.log(resp.data);
      setUser(resp.data.user);
      setBalance(resp.data.balance);
    }).catch((err) => {
      setUser('');
    });
  }
  const handleClose = () =>
  {
    setBalance(+value+balance)
    setShow(false);
  }
  const handleShow = () => setShow(true);

  return (
    <div>
      <Form.Control type="text" id="login" placeholder="Введите логин" onChange={(e) => {setLogin(e.target.value); getUser()}}/>
      {user ? <h1 style={{textAlign: 'left'}}>Баланс: {balance}</h1> : null}
      <Button variant="primary" onClick={handleShow}>
        Пополнить рублевой баланс пользователю
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Пополнение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Введите сумму пополнения</Form.Label>
              <Form.Control
                onChange={event => setValue(event.target.value)}
                type="number"
                placeholder="0"
                autoFocus

              />
            </Form.Group>
          </Form>
        </Modal.Body>
          <Button  variant = "primary" onClick = {handleClose}>
                Пополнить баланс
          </Button>
      </Modal>
    </div>
  )
}

export default Balance;
