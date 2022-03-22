import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { modeState } from "../atom/themeState";

const MobileNavbar = ({ logout }) => {
  const navigate = useNavigate();
  const ModeState = useRecoilValue(modeState);

  return (
    <Navbar
      expand="lg"
      className={
        ModeState.mode === "dark"
          ? "mt-2 bg-transparent navbar-dark"
          : "mt-2 bg-transparent navbar-white"
      }
    >
      <Container>
        <Navbar.Brand>
          Sharing
          <br />
          Portfolios
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>My Page</Nav.Link>
            <Nav.Link onClick={() => navigate("/network")}>Network</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MobileNavbar;
