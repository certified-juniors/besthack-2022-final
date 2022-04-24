import React, { useState } from 'react';
import { Button, Modal, Form, Spinner, Container, Card, Row, Col, ModalButton } from "react-bootstrap";
import { useEffect } from "react";
import axios from 'axios';
import config from "../config";


const Balance = (props) => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const token = localStorage.getItem('token');
  if (token) {
    axios.post('http://' + config.host + '/get-user-info?token=' + token).then((resp) => {
      console.log(resp.data);
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
          {Object.keys(user.balance).map(myCurrency => (
            <Col xs sm="4">
              <Container fluid style={{ marginTop: '30px', marginLeft: '15px', padding: '15px' }}>
                <Card style={{ width: '25rem', height: '10rem' }}>
                  <Card.Img variant="top" src={''} />
                  <Card.Body>
                    <Card.Title style={{ marginTop: '6px' }}>{myCurrency}</Card.Title>
                    <Card.Text>
                      Ваш баланс: {user.balance[myCurrency]}
                    </Card.Text>
                    {myCurrency.title == "RUB" ? "" : <Button myCurrency={myCurrency} />}
                  </Card.Body>
                </Card>
              </Container>
            </Col>))
          }
        </Row>
      </Container> : <Spinner animation="border" variant="primary" />}
    </>
  )
}

export default Balance;
