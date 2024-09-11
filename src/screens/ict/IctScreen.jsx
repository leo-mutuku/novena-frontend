import ModulePageComponent from "../../components/ModulePageComponent";
import { sidelinks } from "./sidelinks";

function IctScreen() {
  alert("hi");
  return <ModulePageComponent page_title="ICT" sidelinks={sidelinks} />;
}

export default IctScreen;
