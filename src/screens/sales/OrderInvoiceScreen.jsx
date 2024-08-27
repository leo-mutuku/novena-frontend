import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "All Invoices", to: "allorderinvoices" }];

function OrderInvoiceScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default OrderInvoiceScreen;
