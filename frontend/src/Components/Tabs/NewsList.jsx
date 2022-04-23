import React from 'react';
import {Button, Container, Card} from "react-bootstrap";
import News from "./News";

const NewsList = (massNews) => {
    return (
        <>
            {massNews.myNews.map(myNews => (
                <Container fluid style = {{marginTop: '50px', marginLeft: '75px'}}>
                    <Card style = {{width: '18em'}}>
                        <Card.Body>
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
                </Container>
                ))
            }
        </>
    )
}

export default NewsList;