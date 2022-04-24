import React, {useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import {useEffect} from "react";


const Balance = () =>
{

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);

  const [balance, setBalance] = useState(0)

  const handleClose = () =>
  {
    setBalance(+value+balance)
    setShow(false);
  }
  const handleShow = () => setShow(true);

  return (
    <div>

      <h1 style={{textAlign: 'left'}}>Баланс: {balance}</h1>
      <Button variant="primary" onClick={handleShow}>
        Пополнить баланс
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
