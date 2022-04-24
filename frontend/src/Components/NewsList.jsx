import React, {useState} from 'react';
import {Container, Card, Col, Row, Pagination, Modal} from "react-bootstrap";
import ModalButtonNews from "./ModalButtonNews"

const NewsList = (massNews) => {

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

// 👇 24/10/2021 (mm/dd/yyyy)


    let items = [];
    for (let number = 1; number <= 20; number++) {
        items.push(
            <Pagination.Item key={number}>
                {number}
            </Pagination.Item>,
        );
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Row className="justify-content-md-center">

                {massNews.myNews.map(myNews => (

                    <Col sm="4">
                        <Container fluid style={{marginTop: '50px', marginLeft: '50px'}}>

                            <Card style={{width: '20em', height: '15em'}}>

                                <Card.Body style={{marginBottom: '10px'}}>
                                    <Card.Title style = {{margin: "10px"}}>
                                        {myNews.title}
                                    </Card.Title>

                                   <span> <ModalButtonNews myNews={myNews} /> <p style={{marginTop: '20px', MozTextSizeAdjust: 'sm'}}> {(formatDate(new Date(myNews.date)))}</p></span>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Col>))
                }
            </Row>
            <Pagination className="justify-content-md-center"
                        style={{marginTop: '15px', marginLeft: '15px', marginBottom: '15px'}}>
                {items}
            </Pagination>
        </>
    )
}

export default NewsList;