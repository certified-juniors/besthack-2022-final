//Navigation bar
import React from 'react';
import Vladimir20 from '../Vladimir20.svg';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import axios from 'axios';
import config from '../config';
import { useState } from 'react';

const myNavs = [
    {
        title: 'Новости',
        link: '/',
    },
    {
        title: 'Курс',
        link: '/currency',
    },
    {
        title: 'Профиль',
        link: '/profile',
    },
]

const MyNavbar = () => {
    let list_nav = myNavs.map((nav) =>
        <Nav.Link href={nav.link}>{nav.title}</Nav.Link>
    )
    const [admin, setAdmin] = useState(false)
    const token = localStorage.getItem('token');
    if (token) {
        axios("http://" + config.host + "/isAdmin?token=" + token, {
            method: "POST",
        }).then(
            res => {
                if (res.data.message == "Пользователь администратор") {
                    setAdmin(true)
                }
            }
        );
    }
    return (
        <div>
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img
                            alt=""
                            src={Vladimir20}
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                        />{' '}

                        Кабанчик

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {list_nav}
                        </Nav>
                    </Navbar.Collapse>
                    <Button href="/login" style={{ marginRight: '10px' }}>
                        Вход
                    </Button>
                    <Button href="/register">
                        Регистрация
                    </Button>
                </Container>
            </Navbar>

        </div>
    )
}

export default MyNavbar;
