import React from 'react';
import {Button, Container, Card, Row, Col} from "react-bootstrap";
import Currency from "./Currency";

const CurrencyList = (massCurrency) => {
  return (
    <>
      <Row className="justify-content-md-center">
        {massCurrency.myCurrency.map(myCurrency => (

          <Col xs sm="4">
            <Container fluid style={{marginTop: '50px', marginLeft: '25px'}}>

              <Card style={{width: '20rem', height: '10rem'}}>
                <Card.Img variant="top" src="holder.js/100px180"/>
                <Card.Body>
                  <Card.Title>{myCurrency.title}</Card.Title>
                  <Card.Text>
                    {myCurrency.text}
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button>*/}
                </Card.Body>
              </Card>
            </Container>
          </Col>))
        }

      </Row>
    </>
  )
}


export default CurrencyList;
