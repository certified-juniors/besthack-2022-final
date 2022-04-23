import React, {useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";

function ModalButton(myCurrency) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Купить
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Покупка валюты {myCurrency.myCurrency.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Количество</Form.Label>
              <Form.Control
                onChange={event => setValue(event.target.value)}
                id = "amount"
                type="number"
                placeholder="0"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Цена</Form.Label>

              <Form.Control disabled={true} placeholder={(value * myCurrency.myCurrency.text).toFixed(4)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Купить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/*render(<Example />);*/


export default ModalButton;