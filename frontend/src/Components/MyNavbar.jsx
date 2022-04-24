//Navigation bar
import React, { useState } from 'react';
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
        <Nav.Link style = {{color : "black"}} href={nav.link}>{nav.title}</Nav.Link>
    )
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
        window.location.href = '/';
    }

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
            <Navbar expand="lg" style={{ background: 'linear-gradient(45deg, #EECFBA, #C5DDE8)' }}>
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img
                            alt=""
                            src={Vladimir20}
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                        />{' '}

                        <a className="disabled" style={{ textDecoration: "none", color: "#000000" }} href="/">Кабанчик</a>

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
                    {admin ? <Button href="/Administration" style = {{margin: "10px", backgroundColor: "#58a12b", borderColor: "#58a12b"}}>Админка</Button> : null}
                    {token ? <Button style = {{margin: "10px", backgroundColor: "#b14646", borderColor: "#b14646"}}onClick={handleLogout}>Выйти</Button> : <>
                        <Button style = {{margin: "10px", backgroundColor: "dodgerblue", borderColor: "dodgerblue"}} href="/login">Войти</Button>
                        <Button style = {{backgroundColor: "#58A12BFF", borderColor: "#58A12BFF"}} href="/register">Регистрация</Button>
                        </>
                    }


                </Container>
            </Navbar>

        </div>
    )
} 

export default MyNavbar;