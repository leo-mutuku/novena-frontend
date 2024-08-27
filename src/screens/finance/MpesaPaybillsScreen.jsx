import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Mpesa paybills', to:"allmpesapaybills"},
  {pagename:'Create Mpesapaybill', to:"creatempesapaybill"},
]

function MpesaPaybillsScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default MpesaPaybillsScreen