import React, {useState} from 'react';
import {Container, Card, Col, Row, Pagination, Modal} from "react-bootstrap";
import ModalButtonNews from "./ModalButtonNews"

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

                    <Col sm="4">
                        <Container fluid style={{marginTop: '50px', marginLeft: '50px'}}>

                            <Card style={{width: '20em'}}>

                                <Card.Body style={{marginBottom: '10px'}}>
                                    <Card.Title>
                                        {myNews.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {myNews.text}
                                    </Card.Text>
                                    <ModalButtonNews myNews={myNews}/>
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