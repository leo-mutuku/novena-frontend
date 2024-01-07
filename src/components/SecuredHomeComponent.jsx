import { Container, Card, Button } from 'react-bootstrap';
import {TbBuildingFactory} from 'react-icons/tb'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import {FaRegMoneyBillAlt,} from 'react-icons/fa'
import {LiaWarehouseSolid} from 'react-icons/lia'
import {BiPurchaseTag} from 'react-icons/bi'
import {FiUsers} from 'react-icons/fi'
import {FaTrailer} from 'react-icons/fa'
import { Link,Outlet } from 'react-router-dom';

const SecuredHomeComponent = () => {
  const moduleMenu = [
    { module_name: "Production", to: "/production", Icon: TbBuildingFactory},
    { module_name: "Sales", to: "/sales", Icon: HiOutlineShoppingCart },
    { module_name: "Finance", to: "/finance",Icon: FaRegMoneyBillAlt  },
    { module_name: "Store", to: "/store",Icon: LiaWarehouseSolid },
    { module_name: "Purchase", to: "/purchase",Icon: BiPurchaseTag },
    { module_name: "Admin", to: "/administration",Icon: FiUsers },
    { module_name: "Fleet", to: "/fleet",Icon: FaTrailer},
  ];

  return (
    <>
    <div className=' py-4'>
    
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-row align-items-center  hero-card bg-light w-100' style={{ width: '10rem' }}>
           {moduleMenu.map(module=>(
           <Card className='w-25 m-2 ' key={module.module_name}>
             <Link to={module.to}>
            <Card.Body>
        <Card.Title>{module.module_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{module.module_sub_title}</Card.Subtitle>
        <Card.Text>
          {<module.Icon size={60}/>}
        </Card.Text>
      </Card.Body>
      </Link>
          </Card>
           ))}

        </Card>
      </Container>
    </div>
    <Outlet/>
    </>
  );
};
export default SecuredHomeComponent;
