import React from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import logo from '../Assets/logo.svg';
import styles from './Header.module.css';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" className="dropdown animate__animated animate__bounce animate__bounceInLeft">
            <Navbar.Brand href="#home" style={{ paddingLeft: '2%' }}>
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
            Voleitech
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#atletas">Atletas</Nav.Link>
                <Nav.Link href="#auxiliares">Auxiliares</Nav.Link>
                <Nav.Link href="#treinos">Treinos</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end" style={{ paddingRight: '2%' }}>
                <Nav className="me-auto" style={{ paddingRight: '2%' }}>
                    <div style={{ paddingRight: '3%' }}>
                        <Button variant="outline-light" className="dropdown animate__animated animate__bounce animate__bounceInLeft" >Login</Button>
                    </div>
                    <Button variant="outline-light" className="dropdown animate__animated animate__bounce animate__bounceInLeft">Cadastro</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header
