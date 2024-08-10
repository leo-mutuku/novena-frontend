import PageActionComponent from "../../components/PageActionComponent";
import { useSelector } from "react-redux";
import { useState } from "react";

function ItemAdjustmentScreen() {
  const role = 9999;
  const { userInfo } = useSelector((state) => state.auth);
  const [accessDenied, setAccessDenied] = useState(false);
  const [roles, setRoles] = useState([]);

  const pagemenus = [
    { pagename: "All stock adjustment", to: "allstockadjustment" },
    {
      pagename: "New Stock Adjustment",
      to: userInfo.roles.includes(role) ? "createstockadjustment" : "",
    },
  ];
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ItemAdjustmentScreen;
