import { Container, Accordion, Row, Col, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function ModulePageComponent(props) {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <>
            <div className="text-right">
              <span className="text-right">{props.page_title}</span>
            </div>
            <Accordion>
              {props.sidelinks.map((sidelink) => (
                <Accordion.Item
                  key={sidelink.menuTitle}
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
