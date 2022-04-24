import React, {useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";

function ModalButton(myCurrency) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" style = {{backgroundColor: "#58A12BFF", borderColor: "#58A12BFF"}} onClick={handleShow}>
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
          <Button variant="secondary" style = {{backgroundColor: "#B14646FF", borderColor: "#B14646FF"}} onClick={handleClose}>
            Отмена
          </Button>
          <Button style = {{backgroundColor: "rgb(88,161,43)", borderColor: "rgb(88,161,43)"}}variant="primary" onClick={handleClose}>
            Купить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/*render(<Example />);*/


export default ModalButton;