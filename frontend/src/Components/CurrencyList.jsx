import React from 'react';
import {Button, Container, Card, Row, Col} from "react-bootstrap";
import Currency from "./Currency";
import ModalButton from "./ModalButton";


const CurrencyList = (massCurrency) => {
  return (
    <>
      <Container fluid>
      <Row className="justify-content-md-center">
        {massCurrency.myCurrency.map(myCurrency => (

          <Col xs sm="4">
            <Container fluid style={{marginTop: '30px', marginLeft: '15px', padding: '15px'}}>

              <Card style={{width: '18rem', height: '10rem'}}>
                <Card.Img variant="top" src="holder.js/100px180"/>
                <Card.Body>
                  <Card.Title>{myCurrency.title}</Card.Title>
                  <Card.Text>
                    {myCurrency.text}
                  </Card.Text>
                  <ModalButton/>
                </Card.Body>
              </Card>
            </Container>
          </Col>))
        }

      </Row>
        </Container>
    </>
  )
}


export default CurrencyList;
