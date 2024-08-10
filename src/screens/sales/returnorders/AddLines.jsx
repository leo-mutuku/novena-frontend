import React, { useState, useEffect } from "react";
import { useParams, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllItemRegisterQuery } from "../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../slices/finance/accountsApiSlice";
import { useGetAllSuppliersQuery } from "../../../slices/administration/suppliersApiSlice";
import { useCreateRurnOrderLineMutation } from "../../../slices/sales/salesOrderReturnLinesApiSlice";
import { useGetAllStoreItemsQuery } from "../../../slices/store/storeItemsApiSlice";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import { Form, Row, Col, Button, Table } from "react-bootstrap";
const AddLines = () => {
  const navigate = useNavigate();
  const { id: _new_id } = useParams();
  const id = parseInt(_new_id);
  const { userInfo } = useSelector((state) => state.auth);

  const { data: item_register } = useGetAllItemRegisterQuery();
  const { data: accounts } = useGetAllAccountsQuery();

  const { data: store } = useGetAllStoreItemsQuery();

  const [sales_order_line, { isSucces }] = useCreateRurnOrderLineMutation();

  const [order_items, set_order_items] = useState({
    return_order_number: 0,
    item_code: 0,
    item_name: null,
    account_number: 0,
    account_name: "",
    item_cost: 0,
    quantity: 0,
    total_cost_per_item: null,
    store_name: null,
    store_code: null,
    store_item_id: 0,
    store_item_code: 0,
    created_by: userInfo?.first_name,
  });
  const [sales_list, set_sales_list] = useState([]);

  useEffect(() => {
    if (userInfo) {
      set_order_items({
        ...order_items,
        created_by: userInfo.first_name,
        return_order_number: id,
      });
    }
  }, [userInfo]);
  //handle item

  const handleSave = async () => {
    try {
      if (sales_list.length === 0) {
        toast.error("Please add at least one item");
        return;
      } else {
        const res = await sales_order_line({
          sales_list,
        }).unwrap();
        if (res.status === "failed") {
          toast.error(res.message);
        } else {
          toast.success("Sales order lines created successfully");
          navigate("/sales/returnorder/allreturnordersintransit");
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleItemCode = (e) => {
    let x = item_register?.data?.filter((a) => {
      if (a.item_code == e.target.value) {
        return a.item_name;
      }
    });

    let y = accounts?.data?.filter((a) => {
      if (a.account_number == x[0].account_number) {
        return a.account_name;
      }
    });

    set_order_items({
      ...order_items,
      item_code: parseInt(e.target.value),
      item_name: x[0].item_name,
      item_cost: parseInt(x[0].current_price),
      account_name: y[0].account_name,
      account_number: x[0].account_number,

      total_cost_per_item: x[0].current_price * order_items.quantity,
    });
  };

  // handle cost
  const handleItemCost = (e) => {
    set_order_items({
      ...order_items,
      item_cost: e.target.value,
      total_cost_per_item: e.target.value * order_items.quantity,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    set_order_items({ ...order_items, created_by: userInfo.first_name });

    if (order_items.item_code != order_items.store_item_code) {
      toast.error("Item and Store Item code must be the same");
      return;
    }
    set_sales_list([...sales_list, order_items]);
  };
  const handleQuantity = (e) => {
    set_order_items({
      ...order_items,
      quantity: parseInt(e.target.value),
      total_cost_per_item: order_items.item_cost * e.target.value,
    });
  };
  // handle supplier
  const handleStore = (e) => {
    let x = store?.data?.filter((a) => {
      if (a.store_item_id == e.target.value) {
        return a.store_name;
      }
    });

    set_order_items({
      ...order_items,
      store_code: x[0].store_code,
      store_name: x[0].store_name,
      store_item_code: x[0].item_code,
      store_item_id: parseInt(e.target.value),
    });
  };

  return (
    <>
      <div> **** Return order {id} *****</div>
      <Form onSubmit={handleSubmit}>
        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="item_code">
              <Form.Label>Order Item</Form.Label>
              <Form.Select
                type="text"
                required
                placeholder="Item Code"
                value={order_items.item_code}
                onChange={handleItemCode}
              >
                {" "}
                <option>Order Item</option>
                {item_register?.data?.map((item, index) => (
                  <option value={item.item_code} key={index}>
                    {item.item_code} | {item.item_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="order_items">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Cost per unit (Ksh)"
                value={order_items.item_cost}
                onChange={handleItemCost}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Quantity"
                value={order_items.quantity}
                onChange={handleQuantity}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {" "}
          <Col>
            <Form.Group className="my-2" controlId="store">
              <Form.Label>Store </Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Store"
                value={order_items.store_item_id}
                onChange={handleStore}
              >
                <option>Store</option>
                {store?.data
                  .filter(
                    (item) =>
                      item.store_name.includes("F") ||
                      item.store_name.includes("Raw") ||
                      item.store_name.includes("By")
                  )
                  .map((item, index) => (
                    <option key={index} value={item.store_item_id}>
                      {item.store_name} - {item.item_name} -{item.item_code}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          Add
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>

      {sales_list?.length === 0 ? (
        <span style={{ color: "#fd7e14" }}>
          No items yet! Add items to Sales Order
        </span>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Account</th>
                <th>Store</th>
                <th>@ Cost</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => set_sales_list([])}
                  >
                    Delete <MdDelete />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sales_list.map((p_items, index) => (
                <tr key={p_items.index}>
                  <td>{index + 1}</td>
                  <td>
                    {p_items.item_code} | {p_items.item_name}
                  </td>
                  <td>
                    {p_items.account_number} | {p_items.account_name}
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
                        set_sales_list(
                          sales_list.filter(
                            (a) => a.item_code !== p_items.item_code
                          )
                        )
                      }
                    >
                      Delete <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button onClick={handleSave} variant="primary">
            Save changes
          </Button>
        </>
      )}
    </>
  );
};

export default AddLines;
