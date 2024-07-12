import { Container, Nav, Navbar } from "react-bootstrap";


export default function Navigation() {
  return (<>
    <Navbar expand="lg" bg="dark"  >
      <Container>
        <Navbar.Brand className='text-light' href="/">La Apuestada del año 4</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/votacion" className='text-light'>Votacion</Nav.Link>
            <Nav.Link href="/resultados" className='text-light'>Resultados</Nav.Link>
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
