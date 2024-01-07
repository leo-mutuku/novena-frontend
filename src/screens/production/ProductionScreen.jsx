
import { Container,Accordion, Row, Col } from 'react-bootstrap';
import ModulePageComponent from '../../components/ModulePageComponent';
import { sidelinks } from './sidelinks';

function ProductionScreen() {
  return (
   <>
   <ModulePageComponent page_title="Production" sidelinks={sidelinks} />
   </>
  )
}

export default ProductionScreen