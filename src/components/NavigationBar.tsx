import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { BASE_URL } from "../util/consts";

export default function Navigation() {
  return (
    <>
      <Navbar expand="lg" bg="dark">
        <Container>
          <Navbar.Brand className="text-light" href={BASE_URL}>
            <Image src={BASE_URL + "/lvda.png"} height={30} />
            <span className="ms-3">La Apuestada del año</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href={BASE_URL + "/votacion"} className="text-light">
                Votacion
              </Nav.Link>
              <Nav.Link href={BASE_URL + "/resultados"} className="text-light">
                Resultados
              </Nav.Link>
            </Nav>
            {/* <Nav>
            <ThemeIcon/>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
