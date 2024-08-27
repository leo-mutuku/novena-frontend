import  {sidelinks } from "./sidelinks"
import ModulePageComponent from "../../components/ModulePageComponent"

function StoreScreen() {
  return (
    <>
    <ModulePageComponent sidelinks={sidelinks} page_title="Store" />
    </>
  )
}

export default StoreScreen