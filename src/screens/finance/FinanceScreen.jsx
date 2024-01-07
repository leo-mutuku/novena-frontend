import { sidelinks } from "./sidelinks"
import ModulePageComponent from "../../components/ModulePageComponent"

function FinanceScreen() {
  return (
    <>
    <ModulePageComponent page_title='Finance' sidelinks={sidelinks}/>
    </>
  )
}

export default FinanceScreen