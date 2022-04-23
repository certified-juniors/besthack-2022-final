import React, {useState} from 'react';
import {Button, Container, Card, Col, Row, Pagination, Modal} from "react-bootstrap";
import News from "./News";
import {render} from "react-dom";

const NewsList = (massNews) => {

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

                    <Col sm = "4">
                        <Container fluid style = {{marginTop: '50px', marginLeft: '50px'}}>
                            <Card onClick = {handleShow} style = {{width: '20em'}}>

                                <Card.Body style = {{marginBottom: '10px'}}>
                                    <Card.Title>
                                        {myNews.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {myNews.text}
                                    </Card.Text>
                                    <Card.Link>
                                        {myNews.link}
                                    </Card.Link>
                                </Card.Body>
                            </Card>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{myNews.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{myNews.text}</Modal.Body>
                                <Modal.Footer>{myNews.link}</Modal.Footer>
                            </Modal>

                        </Container>
                    </Col>))
                }
            </Row>
            <Pagination className="justify-content-md-center" style = {{marginTop: '15px', marginLeft: '15px', marginBottom: '15px'}}>
                {items}
            </Pagination>
        </>
    )
}

export default NewsList;