import PageActionComponent from "../../components/PageActionComponent";
import { useSelector } from "react-redux";

import { useState } from "react";

const UsersScreen = () => {
  const role = 9999;
  const { userInfo } = useSelector((state) => state.auth);
  const [accessDenied, setAccessDenied] = useState(false);
  const [roles, setRoles] = useState([]);
  const pagemenus = [
    {
      pagename: "All users",
      to: userInfo.roles.includes(role) ? "allusers" : "#",
    },
    {
      pagename: "Create user",
      to: userInfo.roles.includes(role) ? "createuser" : "#",
    },
  ];
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default UsersScreen;
