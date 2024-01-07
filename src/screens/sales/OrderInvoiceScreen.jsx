import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Invoices', to:"allorderinvoices"},
  {pagename:'Create Invoice', to:"createinvoice"},
]

function OrderInvoiceScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default OrderInvoiceScreen