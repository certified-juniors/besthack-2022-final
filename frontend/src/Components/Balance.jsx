import React, { useState } from 'react';
import { Button, Modal, Form, Spinner, Container, Card, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import axios from 'axios';
import config from "../config";


const Balance = (props) => {

  const [show, setShow] = useState(false);
  const [value, setValue] = useState();
  const [currency, setCurrency] = useState();
  const [price, setPrice] = useState();
  const [name, setName] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const url = 'http://' + config.host + '/last-exchange-rates';
    axios.post(url).then((resp) => {

      resp.data.map((data, i)  => {
          data.text = 1 / data.text
          data.text = data.text.toFixed(4)
        }
      )

      setPrice(resp.data);
      console.log(price)
    })
  }, [setPrice])

  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const token = localStorage.getItem('token');
  if (token) {
    axios.post('http://' + config.host + '/get-user-info?token=' + token).then((resp) => {
      // console.log(resp.data);
      if (resp.data) {
        setUser(resp.data);
        setLoaded(true);
      }
    })
  } else {
    window.location.href = '/login';
  }

  return (
    <>
      {loaded ? <Container fluid>
        <Row className="justify-content-md-center">
          {Object.keys(user.balance).map(props => (
            <Col xs sm="4">
              <Container fluid style={{ marginTop: '30px', marginLeft: '15px', padding: '15px' }}>
                <Card style={{ width: '25rem', height: '10rem' }}>
                  <Card.Img variant="top" src={''} />
                  <Card.Body>
                    <Card.Title style={{ marginTop: '6px' }}>{props}</Card.Title>
                    <Card.Text>
                      Ваш баланс: {user.balance[props]}
                    </Card.Text>
                    {props === "RUB" ? "" : <Button onClick={() => {
                      setShow(true)
                      setName(props)
                      setCurrency(parseFloat(price))
                    }}>Продать</Button>}
                  </Card.Body>
                </Card>
              </Container>
            </Col>))
          }
        </Row>
      </Container> : <Spinner animation="border" variant="primary" />}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Продажа валюты {currency}</Modal.Title>
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

              <Form.Control disabled={true} placeholder={(value * currency).toFixed(4)}/>
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
  )
}

export default Balance;
