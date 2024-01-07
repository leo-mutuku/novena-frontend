import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'Dispatched orders', to:"dispatchedorders"},
  {pagename:'Undispatched orders', to:"undispatchedorders"},
]
function OrdersDispatchScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default OrdersDispatchScreen