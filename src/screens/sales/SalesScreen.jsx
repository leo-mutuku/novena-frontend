import ModulePageComponent from "../../components/ModulePageComponent";
import { sidelinks } from "./sidelinks";

import { useSelector, useDispatch } from "react-redux";
function SalesScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  return <ModulePageComponent sidelinks={sidelinks} page_title="Sales" />;
}

export default SalesScreen;
