import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useGetAllItemRegisterQuery } from "../../../../slices/store/itemregisterApiSlice";
import { useGetAllAccountsQuery } from "../../../../slices/finance/accountsApiSlice";
import { useGetSalesLinesByHeaderIdQuery } from "../../../../slices/sales/salesOrderLinesApiSlice";
import { usePostSalesOrderMutation } from "../../../../slices/sales/salesOrderHeadersApiSlice";
import ItemEdit from "./ItemEdit";
import Loader from "../../../../components/Loader";
import { toast } from "react-toastify";

function PrintSalesOrder({ purchase_header_id, set_print_mode }) {
  const [checked, setChecked] = useState(false);
  const id = purchase_header_id.toString();
  const { data: purchase_order_lines, error } =
    useGetSalesLinesByHeaderIdQuery(id);
  console.log(purchase_order_lines?.data);
  const [post_purchase, { isLoading }] = usePostSalesOrderMutation();

  const [update_list, set_update_list] = useState([]);

  const [new_quantity, set_new_quantiry] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (purchase_order_lines?.data) {
      set_update_list(purchase_header_id.data);
    }
  }, [purchase_order_lines?.data]);
  const inputRef = useRef(null);
  const handleQuantity = (e) => {
    console.log(inputRef.focus());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    set_purchase_list([...purchase_list, order_items]);
  };
  // const handleQuantity = (e, store_purchase_line_id) => {
  //   const newItem = purchase_order_lines?.data?.map((item) => {
  //     if (item.store_purchase_line_id == store_purchase_line_id) {
  //       return {
  //         ...item,

  //         item_cost: e.target.value * item.item_cost,
  //       };
  //     }

  //     return item;
  //   });

  //   set_update_list(newItem);
  // };
  const [item_edit_state, set_item_edit_state] = useState("none");
  const [items_to_edit, set_items_to_edit] = useState(null);
  const handleItemEdit = (e) => {
    if (items_to_edit) {
      console.log(item_edit_state);
      set_item_edit_state("block");
      return;
    }
    alert("ohh!! You need to select an item first!");
    console.log(items_to_edit);
  };
  const handleToggleCheck = (e) => {
    console.log(e.target.value);
    purchase_order_lines?.data.map((item) => {
      if (item.store_purchase_line_id == e.target.value) {
        set_items_to_edit(null);
        set_items_to_edit(item);
      }
    });
  };

  const handlePost = async (e) => {
    let sales_order_number = purchase_header_id;
    try {
      const res = await post_purchase({
        sales_order_number: sales_order_number,
      }).unwrap();

      if (res.status === "failed") {
        toast.error(err?.data?.message || err.error);
      } else {
        toast.success("sales order posted");
      }
      navigate("../allorders");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return <></>;
}

export default PrintSalesOrder;
