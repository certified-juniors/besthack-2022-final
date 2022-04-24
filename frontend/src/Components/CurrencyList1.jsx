import React from 'react';
import {Button, Container, Card, Row, Col, Image} from "react-bootstrap";
import Currency from "./Currency";
import ModalButton from "./ModalButton";

import Rus from '../flags/Rus.jpg'
import ModalButton1 from "./ModalButton1";

const CurrencyList1 = (massCurrency) => {
  return (
    <>
      <Container fluid>
      <Row className="justify-content-md-center">
        {massCurrency.myCurrency.map(myCurrency => (
          <Col xs sm="4" >
            <Container className='mt-2'>

              <Card >
                <Card.Body>
                  <Card.Title style = {{marginTop: '6px'}}>{myCurrency.title}</Card.Title>
                  <div className="row">
                    <div className="col-md-7 col-12">
                      <Card.Text>
                       Текущий курс: {myCurrency.text}
                      </Card.Text>
                      {myCurrency.title === "RUB" ? "" : <ModalButton1 myCurrency={myCurrency}/>}
                    </div>
                    <div className="col-md-5 d-md-block d-none">
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


export default CurrencyList1;
