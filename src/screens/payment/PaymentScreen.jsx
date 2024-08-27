import ModulePageComponent from "../../components/ModulePageComponent";
import { sidelinks } from "./sidelinks";

const PaymentScreen = () => {
  return (
    <>
      <ModulePageComponent page_title="Payment" sidelinks={sidelinks} />
    </>
  );
};

export default PaymentScreen;
