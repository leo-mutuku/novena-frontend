import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "All Payables", to: "allaccountpayables" }];

function PayablesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default PayablesScreen;
