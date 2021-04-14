import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router';

const Navbar = (params) => {
    const location = useLocation();
    let activeKey = '/' + location.pathname.split('/')[1]
    if(location.pathname.split('/')[1] !== '/admin'){
        activeKey = location.pathname
    }

    const {links} = params
    return(
        <BootstrapNavbar bg="primary" variant="dark">
            <BootstrapNavbar.Brand href="/" >
                <Row>
                    <Col className={"align-self-center"}>
                        <img 
                            src={window.location.origin + '/aphrodite_logo_nobg.png'}
                            width="90"
                            height="90"
                            className="d-inline-block align-top"
                            alt="Aphtodite"
                        />
                    </Col>
                    <Col className={"align-self-center"}>
                        {/* <Row> */}
                            <Row style={{fontSize: '50px'}}>Aphrodite</Row>
                            <Row>Emit the shine within You</Row>
                        {/* </Row> */}
                    </Col>
                </Row>
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle />
            <BootstrapNavbar.Collapse className="justify-content-end">
                {/* <BootstrapNavbar.Text class="text-white">ASU</BootstrapNavbar.Text> */}
                <Nav className="mr-2" activeKey={activeKey}>
                    {
                        links.map((link, i) => (<Nav.Link key={i} href={link.href} className="mr-4">{link.name}</Nav.Link>))
                    }
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    )
}

export default Navbar;