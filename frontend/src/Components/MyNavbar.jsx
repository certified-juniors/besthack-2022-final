//Navigation bar
import React, {useState} from 'react';
import Vladimir20 from '../Vladimir20.svg';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import axios from 'axios';
import config from "../config";
import Administration from "./Administration";

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
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

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
    if (admin) {
        return (
            <div>
                <Navbar expand="lg" style={{background: 'linear-gradient(45deg, #EECFBA, #C5DDE8)'}}>
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
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                {list_nav}
                            </Nav>
                        </Navbar.Collapse>

                        <Button onClick = {() => (setToken( null))}  >
                            Выйти
                        </Button>

                        <a href="/administration">admin</a>

                    </Container>
                </Navbar>

            </div>
        )
    } else if (token != null) {
        return (
            <div>
                <Navbar expand="lg" style={{background: 'linear-gradient(45deg, #EECFBA, #C5DDE8)'}}>
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
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                {list_nav}
                            </Nav>
                        </Navbar.Collapse>


                        <Button onClick = {() => (setToken( null))}  >
                            Выйти
                        </Button>
                    </Container>
                </Navbar>

            </div>
        )
    } else {
        return (
            <div>
                <Navbar expand="lg" style={{background: 'linear-gradient(45deg, #EECFBA, #C5DDE8)'}}>
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
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                {list_nav}
                            </Nav>
                        </Navbar.Collapse>

                        <Button href="/login" style={{marginRight: '10px'}}>
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
}

export default MyNavbar;