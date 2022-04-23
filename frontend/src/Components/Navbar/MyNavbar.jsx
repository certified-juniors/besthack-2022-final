//Navigation bar
import React from 'react';
import Vladimir from '../../Vladimir.svg';
import {Container, Nav, Navbar} from "react-bootstrap";

const myNavs = [
    {
        title: 'Новости',
        link: '/',
    },
    {
        title: 'Курс',
        link: '/',
    },
    {
        title: 'Профиль',
        link: '/',
    },
]

const MyNavbar = () => {
    let list_nav = myNavs.map( (nav) =>
        <Nav.Link href={nav.link}>{nav.title}</Nav.Link>
    )

    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img
                          alt=""
                          src={Vladimir}
                          width="30"
                          height="30"
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
                </Container>
            </Navbar>
        </div>
    )
}

export default MyNavbar;
