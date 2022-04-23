import React from 'react';
import {Button, Container, Card} from "react-bootstrap";
import Currency from "./Currency";

const CurrencyList = (currency) => {

  return (
    <div>
      <Container fluid style={{marginTop: '50px', marginLeft: '75px'}}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{currency.img}{currency.title}</Card.Title>
            <Card.Text>
              {currency.text}
            </Card.Text>
           {/* <Button variant="primary">Go somewhere</Button>*/}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}


export default CurrencyList;
