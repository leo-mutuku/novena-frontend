import PageActionComponent from "../../components/PageActionComponent";
import { useSelector } from "react-redux";
import { useState } from "react";

function StockIssueScreen() {
  const role = 9999;
  const { userInfo } = useSelector((state) => state.auth);
  const [accessDenied, setAccessDenied] = useState(false);
  const [roles, setRoles] = useState([]);

  const pagemenus = [
    { pagename: "All stock Issues", to: "allstoreissues" },
    {
      pagename: "New Stock Issue",
      to: userInfo.roles.includes(role) ? "newstoreissue" : "",
    },
  ];
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default StockIssueScreen;
