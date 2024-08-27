import ModulePageComponent from "../../components/ModulePageComponent";
import { sidelinks } from "./sidelinks";

function PayrollScreen() {
  return (
    <>
      <ModulePageComponent page_title="Payroll" sidelinks={sidelinks} />
    </>
  );
}

export default PayrollScreen;
