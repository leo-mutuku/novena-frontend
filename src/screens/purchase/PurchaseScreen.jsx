import ModulePageComponent from "../../components/ModulePageComponent";
import { sidelinks } from "./sidelinks";

function PurchaseScreen() {
  return (
    <>
      <ModulePageComponent page_title="Purchase" sidelinks={sidelinks} />
    </>
  );
}

export default PurchaseScreen;
