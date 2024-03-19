import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "All Payables", to: "allmpesatill" }];

function PayablesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default PayablesScreen;
