import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

function ModalButtonNews(myNews){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <Button style = {{background : "dodgerblue"}} variant = "primary" onClick = {handleShow}>
                Смотреть
            </Button>

            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{myNews.myNews.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{myNews.myNews.text}</p>
                </Modal.Body>
                <Modal.Footer>
                    <a href = {myNews.myNews.link} style = {{textDecoration: "none", color: "dodgerblue"}}>Смотреть источник</a>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalButtonNews;