import ModulePageComponent from "../../components/ModulePageComponent"
import { sidelinks } from "./sidelinks"
function SalesScreen() {
  return (
    <ModulePageComponent sidelinks={sidelinks} page_title="Sales"/>
  )
}

export default SalesScreen