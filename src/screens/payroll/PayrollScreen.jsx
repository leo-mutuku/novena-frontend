import ModulePageComponent from "../../components/ModulePageComponent";
import { sidelinks } from "./sidelinks";

function PayrollScreen() {
  return (
    <>
      <ModulePageComponent page_title="Purchase" sidelinks={sidelinks} />
    </>
  );
}

export default PayrollScreen;
