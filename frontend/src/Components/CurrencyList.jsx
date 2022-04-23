import React from 'react';
import {Button, Container, Card} from "react-bootstrap";
import Currency from "./Currency";

const CurrencyList = (massCurrency) => {
  return (
    <>
      {massCurrency.myCurrency.map(myCurrency => (
        <Container fluid style={{marginTop: '50px', marginLeft: '75px'}}>
          <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="holder.js/100px180"/>
            <Card.Body>
              <Card.Title>{myCurrency.title}</Card.Title>
              <Card.Text>
                {myCurrency.text}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button>*/}
            </Card.Body>
          </Card>
        </Container>))}
    </>
  )
}


export default CurrencyList;
