import { Table, Button, Row, Col, Form } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useCreateStorePurchaseLineMutation } from "../../../../slices/purchase/storePurchaseLinesApiSlice";
import { useGetAllPackHousePeopleQuery } from "../../../../slices/production/packHousePeopleApiSlice";

function AddProductionModal({ purchase_data, store_purchase_id, set_mode }) {
  let purchase_id = parseInt(store_purchase_id);

  const { data: pack_house_people } = useGetAllPackHousePeopleQuery();
  console.log(pack_house_people?.data);
  const { userInfo } = useSelector((state) => state.auth);
  const [purchase_line, { isLoading }] = useCreateStorePurchaseLineMutation();
  const navigate = useNavigate();
  const [total_cost, set_total_cost] = useState(0);

  const [cost_of_packing_one_kg_bale, set_cost_of_packing_one_kg_bale] =
    useState("");
  const [number_of_one_kg_bale_packed, set_number_of_one_kg_bale_packed] =
    useState("");
  const [cost_of_packing_half_kg_bale, set_cost_of_packing_half_kg_bale] =
    useState("");
  const [number_of_half_kg_bale_packed, set_number_of_half_kg_bale_packed] =
    useState("");
  const [staff_id, set_staff_id] = useState("");
  const [one_kg_bale_code, set_one_kg_bale_code] = useState("");
  const [half_kg_bale_code, set_half_kg_bale_code] = useState("");
  const [one_kg_packet_code, set_one_kg_packet_code] = useState("");
  const [half_kg_packet_code, set_half_kg_packet_code] = useState();

  const [purchase_list, set_purchase_list] = useState([]);
  console.log(purchase_list);

  useEffect(() => {
    if (userInfo) {
    }

    navigate();
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {};

  const handleSave = async () => {};

  // handle packed one kg bale
  const handlePackedOneKgBale = (e) => {
    alert("kk");
  };

  // const handleStore = (e) => {
  //   let x = store?.data?.filter((a) => {
  //     if (a.store_code == e.target.value) {
  //       return a.store_name;
  //     }
  //   });
  //   set_order_items({
  //     ...order_items,
  //     store_code: e.target.value,
  //     store_name: x[0].store_name,
  //   });
  // };

  return (
    <>
      <div
        style={{
          position: "absolute",
          background: "rgb(204 204 204 / 70%)",
          width: "100%",
          height: "100%",
          top: "0p%",
          left: "0p%",
          right: "0%",
          bottom: "0%",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2%",
            margin: "4%",
          }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton onClick={() => set_mode("none")}>
              <Modal.Title style={{ fontSize: "14px" }}>
                <span style={{ fontSize: "14px" }}>
                  Production batch no. {store_purchase_id}
                </span>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <hr />
              <span>*** Add Production Line Items ***</span>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="pack_date">
                        <Form.Label>Pack house staff</Form.Label>
                        <Form.Select
                          type="number"
                          required
                          placeholder="Pack Date"
                          value={staff_id}
                          onChange={(e) => set_staff_id(e.target.value)}
                        >
                          <option value={""}>Select Pack house Staff</option>
                          {pack_house_people?.data.map((item, key) => (
                            <option key={key} value={item.staff_id}>
                              {item.first_name} {item.last_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="pack_officer">
                        <Form.Label>No of 1kg bales packed</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder=""
                          value={number_of_one_kg_bale_packed}
                          onChange={handlePackedOneKgBale}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="pack_type">
                        <Form.Label>Number of 1/2 Kg Bale Packed</Form.Label>
                        <Form.Control
                          type="option"
                          required
                          placeholder=""
                          value={number_of_half_kg_bale_packed}
                          onChange={(e) =>
                            set_number_of_half_kg_bale_packed(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="pack_type">
                        <Form.Label>Pack Date</Form.Label>
                        <Form.Control
                          type="date"
                          required
                          placeholder=""
                          value={number_of_half_kg_bale_packed}
                          onChange={(e) =>
                            set_number_of_half_kg_bale_packed(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="pack_type">
                        <Form.Label>Pay 1 KG Bale</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder=""
                          value={number_of_half_kg_bale_packed}
                          onChange={(e) =>
                            set_number_of_half_kg_bale_packed(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="pack_type">
                        <Form.Label>Pay 1 KG Bale</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder=""
                          value={number_of_half_kg_bale_packed}
                          onChange={(e) =>
                            set_number_of_half_kg_bale_packed(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="my-2" controlId="pack_type">
                        <Form.Label>Batch Number</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder=""
                          value={number_of_half_kg_bale_packed}
                          onChange={(e) =>
                            set_number_of_half_kg_bale_packed(e.target.value)
                          }
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <br />
                  <div>
                    <Button type="submit">Add item</Button>
                  </div>
                </Form>
                <br />
              </div>
              {/* List of items */}
              {purchase_list?.length === 0 ? (
                <span style={{ color: "#fd7e14" }}>No items yet!</span>
              ) : (
                <>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>1 KG Bales</th>
                        <th>Pay 1 KG Bales</th>
                        <th>1/2 KG Bales</th>
                        <th>Pay 1/2 KG Bales</th>
                        <th>Total</th>
                        <th>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => set_purchase_list([])}
                          >
                            Delete <MdDelete />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    {purchase_list.map((p_items, index) => (
                      <>
                        <tbody>
                          <tr key={p_items.item_code}>
                            <td>{index + 1}</td>
                            <td>
                              {p_items.item_code} | {p_items.item_name}
                            </td>
                            <td>
                              {p_items.account_number} | {p_items.account_name}
                            </td>
                            <td>
                              {p_items.supplier_number} |{" "}
                              {p_items.supplier_name}
                            </td>
                            <td>
                              {p_items.store_code} | {p_items.store_name}
                            </td>
                            <td>{p_items.item_cost}</td>
                            <td>{p_items.quantity}</td>
                            <td>{p_items.total_cost_per_item}</td>
                            <td>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  set_purchase_list(
                                    purchase_list.filter(
                                      (a) => a.item_code !== p_items.item_code
                                    )
                                  )
                                }
                              >
                                Delete <MdDelete />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    ))}
                  </Table>
                </>
              )}
              <br />
            </Modal.Body>

            <Modal.Footer className="gap-2">
              <Button onClick={handleSave} variant="primary">
                Save changes
              </Button>

              <Button variant="secondary" onClick={() => set_mode("none")}>
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
    </>
  );
}

export default AddProductionModal;
