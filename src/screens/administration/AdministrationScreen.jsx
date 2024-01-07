import ModulePageComponent from "../../components/ModulePageComponent"
import { sidelinks } from "./sidelinks"


function AdministrationScreen() {
  return (
    <ModulePageComponent page_title='Administration' sidelinks={sidelinks}/>
  )
}

export default AdministrationScreen