import { Container, Accordion, Row, Col, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function ModulePageComponent({ sidelinks, page_title }) {
  if (!Array.isArray(sidelinks)) {
    // Prevent errors if sidelinks is not an array
    console.error("Invalid sidelinks: should be an array.");
    return null;
  }

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <>
            <div className="text-right">
              <span className="text-right">{page_title}</span>
            </div>
            <Accordion>
              {sidelinks.map((sidelink) => (
                <Accordion.Item
                  key={sidelink.menuTitle} // Ensure this is unique
                  eventKey={sidelink.menuTitle}
                >
                  <Accordion.Header>{sidelink.menuTitle}</Accordion.Header>

                  <Accordion.Body>
                    {sidelink.subMenus.map((submenu) => (
                      <Link to={submenu.to} key={submenu.subMenuTitle}>
                        <Button variant="light" className="my-2 mx-2">
                          {submenu.subMenuTitle}
                        </Button>
                      </Link>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        </Col>
        <Col xs={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default ModulePageComponent;
