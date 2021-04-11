import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router';

const Navbar = () => {
    const location = useLocation();
    return(
        // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        //     <Link to="/" className="navbar-brand">Aphrodite</Link>
        //     <div className="collapse navbar-collapse">
        //         <ul className="navbar-nav mr-auto">
        //             <li className="navbar-item">
        //                 <Link to="/" className="nav-link">HOME</Link>
        //             </li>
        //             <li className="navbar-item">
        //                 <Link to="/about" className="nav-link">ABOUT US</Link>
        //             </li>
        //             <li className="navbar-item">
        //                 <Link to="/collections" className="nav-link">COLLECTIONS</Link>
        //             </li>
        //             <li className="navbar-item">
        //                 <Link to="/journal" className="nav-link">JOURNAL</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
        <BootstrapNavbar bg="primary" variant="dark">
            <BootstrapNavbar.Brand href="/" >
                <Row>
                    <Col className={"align-self-center"}>
                        <img 
                            src={window.location.origin + '/aphrodite_logo_nobg.png'}
                            width="90"
                            height="90"
                            className="d-inline-block align-top"
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
                <Nav className="mr-2" activeKey={location.pathname}>
                    <Nav.Link href="/" className="mr-4">HOME</Nav.Link>
                    <Nav.Link href="/about" className="mr-4">ABOUT US</Nav.Link>
                    <Nav.Link href="/collections" className="mr-4">COLLECTIONS</Nav.Link>
                    <Nav.Link href="/journal" className="mr-4">JOURNAL</Nav.Link>
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    )
}

export default Navbar;