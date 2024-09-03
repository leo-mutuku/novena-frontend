import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useCreateBaleSetupMutation } from "../../../slices/sales/salesPeopleApiSlice";
import { useGetAllFinalProductsQuery } from "../../../slices/store/itemregisterApiSlice";
import { toast } from "react-toastify";
const AddItem = () => {
  const [baleSetup] = useCreateBaleSetupMutation(); // console.log(baleSetup);
  const { data: products } = useGetAllFinalProductsQuery();
  const [item, setItem] = React.useState(0);
  const [bales_units, set_bales_units] = React.useState(0);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await baleSetup({
        item,
        bales_units,
      }).unwrap();
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <span>*** Add a product</span>

      <Row>
        <div>
          {" "}
          <hr />
        </div>
      </Row>
      <Form onSubmit={handleSubmit}>
        {/* */}
        <Row>
          <Col>
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label>Product</Form.Label>
              <Form.Select
                type="number"
                required
                placeholder="Product"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              >
                <option value="">Select Product</option>
                {products &&
                  products?.data.map((product, index) => (
                    <option key={index} value={product.item_code}>
                      {product.item_name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="my-2" controlId="account_number">
              <Form.Label>Bale units</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Bale units"
                value={bales_units}
                onChange={(e) => set_bales_units(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          submit
        </Button>

        {/* {isLoading && <Loader />} */}
      </Form>
    </>
  );
};

export default AddItem;
