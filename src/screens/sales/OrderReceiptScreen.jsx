import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All receipts', to:"Allreceipts"},
]

function OrderReceiptScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default OrderReceiptScreen