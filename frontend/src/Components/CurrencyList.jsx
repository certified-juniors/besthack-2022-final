import React from 'react';
import {Button, Container, Card, Row, Col, Image} from "react-bootstrap";
import Currency from "./Currency";
import ModalButton from "./ModalButton";

import Rus from '../flags/Rus.jpg'

const CurrencyList = (massCurrency) => {
  return (
    <>
      <Container fluid>
      <Row className="justify-content-md-center">
        {massCurrency.myCurrency.map(myCurrency => (
          <Col xs sm="4">
            <Container fluid style={{marginTop: '30px', marginLeft: '15px', padding: '15px'}}>

              <Card style={{width: '25rem', height: '10rem'}}>
                <Card.Body>
                  <Card.Title style = {{marginTop: '6px'}}>{myCurrency.title}</Card.Title>
                  <div className="row g-0">
                    <div className="col-8">
                      <Card.Text>
                       Текущий курс: {myCurrency.text}
                      </Card.Text>
                      {myCurrency.title === "RUB" ? "" : <ModalButton myCurrency={myCurrency}/>}
                    </div>
                    <div className="col-4">
                      <Image fluid src={myCurrency.img} className="rounded-start" />
                    </div>
                  </div>
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
