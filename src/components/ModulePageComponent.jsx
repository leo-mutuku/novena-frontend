import { Container, Accordion, Row, Col, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ModulePageComponent({ sidelinks, page_title }) {
  const { userInfo } = useSelector((state) => state.auth);
  if (!Array.isArray(sidelinks)) {
    // Prevent errors if sidelinks is not an array
    console.error("Invalid sidelinks: should be an array.");
    return null;
  }

  return (
    <Container>
      <Row>
        <Col xs={3}>
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
                  {sidelink.subMenus.map(
                    (submenu) =>
                      // Check if sidelink has a role
                      submenu.role &&
                      userInfo.roles.includes(parseInt(submenu.role)) ? (
                        <Link to={submenu.to} key={submenu.subMenuTitle}>
                          <Button variant="light" className="my-2 mx-2">
                            {submenu.subMenuTitle}
                          </Button>
                        </Link>
                      ) : !submenu.role ? (
                        <Link to={submenu.to} key={submenu.subMenuTitle}>
                          <Button variant="light" className="my-2 mx-2">
                            {submenu.subMenuTitle}
                          </Button>
                        </Link>
                      ) : null // Return null if no conditions are met
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
        <Col xs={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default ModulePageComponent;
