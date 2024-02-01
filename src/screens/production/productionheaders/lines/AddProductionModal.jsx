import { Table, Button, Row, Col, Form } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";
import { useGetAllSuppliersQuery } from "../../../../slices/administration/suppliersApiSlice";
import { useCreateProductionLineMutation } from "../../../../slices/production/ProductionLinesApiSlice";
import { useGetAllStoreRegisterQuery } from "../../../../slices/store/storeRegisterApiSlice";

function AddProductionModal({ store_purchase_id, batch_number, set_mode }) {
  let purchase_id = parseInt(store_purchase_id);

  const { data: item_register } = useGetAllItemRegisterQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [production_line, { isLoading }] = useCreateProductionLineMutation();
  const { data: stores } = useGetAllStoreRegisterQuery();
  const navigate = useNavigate();
  const [products, set_products] = useState({
    product_code: 0,
    product_name: "",
    product_units_value: 1,
    product_output: 0,
    first_pack: "",
    first_pack_name: "",
    first_pack_count: 0,
    second_pack: "",
    weight_in_kgs: 0,
    weight_in_bags: 0,
    second_pack_name: "",
    second_pack_count: "",
    production_buffer: "store",
    created_by: "",
    production_number: "",
    batch_number: "",
    store_code: 0,
    store_name: "",
  });

  const [production_list, set_production_list] = useState([]);

  useEffect(() => {
    if (userInfo) {
      set_products({
        ...products,
        created_by: userInfo.first_name,
        purchase_header_id: purchase_id,
      });
    }

    navigate();
  }, [userInfo, navigate, purchase_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    set_products({ ...products, created_by: userInfo.first_name });
    set_production_list([...production_list, products]);
  };

  const handleSave = async () => {
    try {
      if (production_list.length === 0) {
        alert("Add items to purchase first!");
      } else {
        const res = await production_line({
          production_number: products.production_number,
          created_by: products.created_by,
          production_line: production_list,
        }).unwrap();
        if (res.status == "failed") {
          toast.error(res.message);
        } else {
          toast.success("Production lines created successfully");
          navigate("../allpostedtransiactionheaderlist");
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  //handle item
  const handleItemCode = (e) => {
    let x = item_register?.data?.filter((a) => {
      if (a.item_code == e.target.value) {
        return a.item_name;
      }
    });

    set_products({
      ...products,
      product_code: parseInt(e.target.value),
      product_name: x[0].item_name,
      batch_number: batch_number,
      production_number: parseInt(products.purchase_header_id),
      product_units_value: parseInt(x[0].item_units_value),
      weight_in_kgs:
        parseInt(x[0].item_units_value) * parseInt(products.product_output),
      weight_in_bags: parseFloat(
        (parseInt(x[0].item_units_value) * parseInt(products.product_output)) /
          90
      ).toFixed(2),
    });
  };
  const handFirstPack = (e) => {
    let x = item_register?.data?.filter((a) => {
      if (a.item_code == e.target.value) {
        return a.item_name;
      }
    });
    set_products({
      ...products,
      first_pack: parseInt(e.target.value),
      first_pack_name: x[0].item_name,
    });
  };
  const handSecondPack = (e) => {
    let x = item_register?.data?.filter((a) => {
      if (a.item_code == e.target.value) {
        return a.item_name;
      }
    });
    set_products({
      ...products,
      second_pack: e.target.value,
      second_pack_name: x[0].item_name,
    });
  };
  const handProductOutput = (e) => {
    set_products({
      ...products,
      product_output: parseInt(e.target.value),
      first_pack_count: parseInt(e.target.value),
      weight_in_kgs:
        parseInt(e.target.value) * parseInt(products.product_units_value),
      weight_in_bags:
        (parseInt(e.target.value) * parseInt(products.product_units_value)) /
        90,
    });
  };
  const handleSecondaryPackCount = (e) => {
    set_products({ ...products, second_pack_count: e.target.value });
  };
  const handleProductionBuffer = (e) => {
    if (e.target.value === "pack_house") {
      set_products({
        ...products,
        first_pack: "",
        first_pack_name: "",
        first_pack_count: "",
      });
    }
    set_products({ ...products, production_buffer: e.target.value });
  };
  const handleStore = (e) => {
    let x = stores?.data?.filter((a) => {
      if (a.store_code == e.target.value) {
        return a.store_name;
      }
    });
    set_products({
      ...products,
      store_code: parseInt(x[0].store_code),
      store_name: x[0].store_name,
    });
  };
  console.log(products);
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
                  Production no. {store_purchase_id}
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; Batch Number{" "}
                {batch_number}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <hr />
              <span>*** Add Production Line Items ***</span>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="my-2" controlId="item_code">
                        <Form.Label>Product</Form.Label>
                        <Form.Select
                          type="text"
                          required
                          placeholder="product"
                          value={products.product_code}
                          onChange={handleItemCode}
                        >
                          {" "}
                          <option>Product item</option>
                          {item_register?.data?.map((item, index) => (
                            <option value={item.item_code} key={index}>
                              {item.item_code} | {item.item_name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="my-2" controlId="product_output">
                        <Form.Label>Product Output </Form.Label>
                        <Form.Control
                          type="number"
                          required
                          placeholder="Output"
                          value={products.product_output}
                          onChange={handProductOutput}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="my-2"
                        controlId="production_buffer"
                      >
                        <Form.Label>Product item buffer </Form.Label>
                        <Form.Check
                          type="radio"
                          required
                          label="Store"
                          id="store"
                          value="store"
                          checked={products.production_buffer === "store"}
                          onChange={handleProductionBuffer}
                        ></Form.Check>
                        <Form.Check
                          type="radio"
                          label="Pack house"
                          value="pack_house"
                          id="pack_house"
                          checked={products.production_buffer === "pack_house"}
                          onChange={handleProductionBuffer}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {products.production_buffer === "store" ? (
                    <Row>
                      <Col>
                        <Form.Group className="my-2" controlId="naraturation">
                          <Form.Label>Package </Form.Label>
                          <Form.Select
                            type="text"
                            required
                            placeholder="Total"
                            value={products.first_pack}
                            onChange={handFirstPack}
                          >
                            <option value={""}>Select Package </option>
                            {item_register?.data.map((item, index) => (
                              <option value={item.item_code}>
                                {item.item_name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="my-2" controlId="naraturation">
                          <Form.Label>Number of Packets </Form.Label>
                          <Form.Control
                            type="number"
                            required
                            placeholder="Number of packets"
                            value={products.first_pack_count}
                            disabled
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="my-2" controlId="naraturation">
                          <Form.Label>Store (Packaging Material)</Form.Label>
                          <Form.Select
                            type="number"
                            required
                            placeholder="Primary Package No. of Packets"
                            value={products.store_code}
                            onChange={handleStore}
                          >
                            <option value={""}>Select Store</option>
                            {stores?.data.map((item, index) => (
                              <>
                                <option value={item.store_code}>
                                  {item.store_name}
                                </option>
                              </>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )}
                  <br />
                  <div>
                    <Button type="submit">Add item</Button>
                  </div>
                </Form>
                <br />
              </div>
              {/* List of items */}
              {production_list?.length === 0 ? (
                <span style={{ color: "#fd7e14" }}>
                  No items yet! Add items to production list
                </span>
              ) : (
                <>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Product Output</th>
                        <th>Product Buffer</th>
                        <th>Packaging Name</th>
                        <th>Packaging Count</th>
                        <th>T.Weight (KG)</th>
                        <th>T.Weight (90 KG)</th>
                        <th>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => set_production_list([])}
                          >
                            Delete <MdDelete />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    {production_list.map((p_items, index) => (
                      <>
                        <tbody>
                          <tr key={p_items.item_code}>
                            <td>{index + 1}</td>
                            <td>{p_items.product_name}</td>

                            <td>{p_items.product_output}</td>
                            <td>
                              {p_items.production_buffer === "store" ? (
                                <>{p_items.store_name}</>
                              ) : (
                                <>Pack House</>
                              )}
                            </td>
                            <td>
                              {p_items.production_buffer === "pack_house" ? (
                                <>N/A</>
                              ) : (
                                <>{p_items.first_pack_name}</>
                              )}
                            </td>
                            <td>
                              {p_items.production_buffer === "pack_house" ? (
                                <>N/A</>
                              ) : (
                                <>{p_items.first_pack_count}</>
                              )}
                            </td>
                            <td>{p_items.weight_in_kgs}</td>

                            <td>{p_items.weight_in_bags}</td>
                            <td>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  set_production_list(
                                    production_list.filter(
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
                Post Production
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
