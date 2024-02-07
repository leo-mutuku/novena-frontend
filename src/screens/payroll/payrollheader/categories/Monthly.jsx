import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { MDBCheckbox } from "mdb-react-ui-kit";

const Monthly = () => {
  const [nhif, set_nhif] = useState(false);
  const [nssf, set_nssf] = useState(false);
  return (
    <>
      <hr></hr>

      <Row>
        <Col>
          <div>Statutory Dedauctions: </div>
          <MDBCheckbox
            id="controlledCheckbox"
            label="NHIF"
            checked={nhif}
            onChange={() => set_nhif(!nhif)}
          />
          <MDBCheckbox
            id="controlledCheckbox"
            label="NHIF"
            checked={nssf}
            onChange={() => set_nssf(!nssf)}
          />
        </Col>
        <Col>
          <div>Statutory Dedauctions: </div>
          <MDBCheckbox
            id="controlledCheckbox"
            label="NHIF"
            checked={nhif}
            onChange={() => set_nhif(!nhif)}
          />
          <MDBCheckbox
            id="controlledCheckbox"
            label="NHIF"
            checked={nssf}
            onChange={() => set_nssf(!nssf)}
          />
        </Col>
        <Col>
          <div>Statutory Dedauctions: </div>
          <MDBCheckbox
            id="controlledCheckbox"
            label="NHIF"
            checked={nhif}
            onChange={() => set_nhif(!nhif)}
          />
          <MDBCheckbox
            id="controlledCheckbox"
            label="NHIF"
            checked={nssf}
            onChange={() => set_nssf(!nssf)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Monthly;
